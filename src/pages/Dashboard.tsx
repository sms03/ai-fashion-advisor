
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import ScenarioInput from '../components/ScenarioInput';
import { Camera, Sparkles, User, Zap } from 'lucide-react';
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

  const popularPrompts = [
    "What should I wear to a summer wedding?",
    "Help me style a business casual outfit",
    "Recommend an outfit for a first date",
    "What's trending in streetwear right now?",
  ];

  const trendingPrompts = [
    "Create a capsule wardrobe for fall",
    "Style tips for a beach vacation",
    "Office wear inspiration for summer",
    "How to mix patterns in outfits",
  ];

  const quickStartPrompts = [
    "Analyze my outfit for a job interview",
    "Suggest accessories for this look",
    "Help me color coordinate this outfit",
    "Make this outfit more casual",
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
      <div className="container mx-auto px-4 pt-24 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Upload Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-fashion-text">
              <Camera className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">Upload Your Photo</h2>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          </section>

          {/* Prompts Sections */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3 text-fashion-text">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">Fashion Prompts</h2>
            </div>

            {/* Popular Prompts */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-medium text-fashion-text">Popular Prompts</h3>
              <div className="flex flex-wrap gap-2">
                {popularPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleScenarioSubmit(prompt)}
                    className="px-4 py-2 rounded-full bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] text-sm transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Prompts */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-medium text-fashion-text">Trending Now</h3>
              <div className="flex flex-wrap gap-2">
                {trendingPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleScenarioSubmit(prompt)}
                    className="px-4 py-2 rounded-full bg-[#FEF7CD] text-[#1B1B1B] hover:bg-[#FCF0B0] text-sm transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Start Prompts */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-medium text-fashion-text">Quick Start</h3>
              <div className="flex flex-wrap gap-2">
                {quickStartPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleScenarioSubmit(prompt)}
                    className="px-4 py-2 rounded-full bg-[#F2FCE2] text-[#1B1B1B] hover:bg-[#E5F0D5] text-sm transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt Input */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-lg font-medium text-fashion-text mb-4">Custom Prompt</h3>
              <ScenarioInput onScenarioSubmit={handleScenarioSubmit} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
