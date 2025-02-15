
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import ScenarioInput from '../components/ScenarioInput';
import { Camera, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { callPythonBackend } from '@/utils/pythonApi';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleScenarioSubmit = async (scenario: string) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to get fashion advice",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      // Call Python backend
      const response = await callPythonBackend({
        scenario,
        hasImage: !!selectedImage
      });

      console.log('Python backend response:', response);
      
      toast({
        title: "Success",
        description: "Successfully connected to Python backend!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/profile')}
              className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              asChild
              className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
            >
              <Link to="/auth?mode=login">Login</Link>
            </Button>
            <Button 
              variant="default" 
              asChild
              className="bg-[#FEF7CD] text-[#1B1B1B] hover:bg-[#FCF0B0] border-[#E5E5E5]"
            >
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="scroll-reveal inline-flex items-center justify-center px-4 py-2 
            bg-white/80 backdrop-blur-sm rounded-full text-fashion-text mb-4 border border-fashion-border">
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">AI-Powered Fashion Advice</span>
          </div>
          <h1 className="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold text-fashion-text tracking-tight">
            Your Personal<br />AI Fashion Advisor
          </h1>
          <p className="scroll-reveal scroll-reveal-delay-2 text-lg text-fashion-muted max-w-2xl mx-auto leading-relaxed">
            Upload your photo and describe your scenario. Our AI will provide personalized fashion advice and outfit suggestions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-4 pb-24 space-y-12">
        <div className="space-y-12">
          <div className="scroll-reveal space-y-6">
            <div className="flex items-center space-x-3 text-fashion-text">
              <Camera className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">Upload Your Photo</h2>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          </div>

          <div className="scroll-reveal space-y-6">
            <h2 className="text-xl font-semibold text-fashion-text tracking-tight">
              Describe Your Scenario
            </h2>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
              <ScenarioInput onScenarioSubmit={handleScenarioSubmit} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
