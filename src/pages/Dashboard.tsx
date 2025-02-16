
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import ScenarioInput from '../components/ScenarioInput';
import { Camera, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { callPythonBackend } from '@/utils/pythonApi';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const trendingPrompts = [
    "What should I wear to a summer wedding?",
    "Help me style a business casual outfit",
    "Recommend an outfit for a first date",
    "What's trending in streetwear right now?",
  ];

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleScenarioSubmit = async (scenario: string) => {
    try {
      const response = await callPythonBackend({
        scenario,
        hasImage: !!selectedImage
      });
      
      console.log('Python backend response:', response);
      
      toast({
        title: "Success",
        description: "Successfully got fashion advice!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/profile')}
          className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </nav>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-4 pt-24 pb-24 space-y-12">
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
              <div className="mb-6">
                <h3 className="text-sm font-medium text-fashion-text mb-3">Trending Prompts:</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleScenarioSubmit(prompt)}
                      className="px-3 py-1.5 rounded-full bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] text-sm transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <ScenarioInput onScenarioSubmit={handleScenarioSubmit} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
