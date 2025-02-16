
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Camera, Zap, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const features = [
    {
      icon: <Camera className="w-6 h-6 text-accent" />,
      title: "Visual Analysis",
      description: "Upload your outfits for instant AI-powered fashion advice and recommendations"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      title: "Personalized Suggestions",
      description: "Get tailored fashion recommendations based on your style preferences"
    },
    {
      icon: <Palette className="w-6 h-6 text-accent" />,
      title: "Style Guidelines",
      description: "Access expert fashion tips and trending style combinations"
    }
  ];

  const examples = [
    "What should I wear to a summer wedding?",
    "Help me style a business casual outfit",
    "Create a capsule wardrobe for fall",
    "Style tips for a beach vacation"
  ];

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            asChild
            className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
          >
            <Link to="/auth?mode=login">Sign In</Link>
          </Button>
          <Button 
            variant="default" 
            asChild
            className="bg-[#FEF7CD] text-[#1B1B1B] hover:bg-[#FCF0B0] border-[#E5E5E5]"
          >
            <Link to="/auth?mode=signup">Sign Up</Link>
          </Button>
        </div>
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
            Transform your wardrobe with personalized fashion recommendations powered by advanced AI technology.
          </p>
          <div className="scroll-reveal scroll-reveal-delay-3">
            <Button 
              asChild
              className="bg-[#F2FCE2] text-[#1B1B1B] hover:bg-[#E5F0D5] border-[#E5E5E5] px-8 py-6 text-lg"
            >
              <Link to="/auth?mode=signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="scroll-reveal bg-white/50 backdrop-blur-sm p-6 rounded-xl space-y-4"
            >
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-fashion-text">{feature.title}</h3>
              <p className="text-fashion-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Prompts Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl space-y-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold text-fashion-text">Example Prompts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((example, index) => (
              <div 
                key={index}
                className="p-4 bg-[#F1F0FB] rounded-lg text-[#1B1B1B]"
              >
                "{example}"
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
