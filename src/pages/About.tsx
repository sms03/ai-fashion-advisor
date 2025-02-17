import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Share2, Sparkles, Globe, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/shared/Footer';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-accent" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI technology analyzes your style preferences and provides personalized fashion recommendations."
    },
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "Global Fashion Insights",
      description: "Stay updated with real-time fashion trends from around the world, curated specifically for you."
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Personal Styling",
      description: "Get outfit recommendations tailored to your body type, style preferences, and occasion."
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Smart Wardrobe Management",
      description: "Organize and optimize your wardrobe with AI-driven suggestions for mix-and-match combinations."
    }
  ];

  return (
    <div className="min-h-screen gradient-bg overflow-hidden flex flex-col">
      <nav className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            asChild
            className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-24 flex-grow">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-fashion-text font-playfair dark:text-[#F2FCE2]">
              About Our AI Fashion Advisor
            </h1>
            <p className="text-xl text-fashion-muted max-w-2xl mx-auto dark:text-[#E5DEFF]/80">
              We combine artificial intelligence with fashion expertise to provide personalized style recommendations and trends analysis.
            </p>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-xl space-y-4 dark:bg-black/20"
              >
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-fashion-text font-playfair dark:text-[#FEF7CD]">{feature.title}</h3>
                <p className="text-fashion-muted dark:text-[#E5DEFF]/80">{feature.description}</p>
              </div>
            ))}
          </section>

          {/* How It Works */}
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-xl space-y-6 dark:bg-black/20">
            <h2 className="text-2xl font-semibold text-fashion-text text-center font-playfair dark:text-[#FFDEE2]">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="bg-[#F2FCE2] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-fashion-text">1</span>
                </div>
                <h3 className="font-semibold text-fashion-text font-playfair dark:text-[#D3E4FD]">Upload Your Style</h3>
                <p className="text-fashion-muted dark:text-[#E5DEFF]/80">Share your current outfits or style preferences</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-[#FEF7CD] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-fashion-text">2</span>
                </div>
                <h3 className="font-semibold text-fashion-text font-playfair dark:text-[#F2FCE2]">AI Analysis</h3>
                <p className="text-fashion-muted dark:text-[#E5DEFF]/80">Our AI analyzes your style and preferences</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-[#E5DEFF] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-fashion-text">3</span>
                </div>
                <h3 className="font-semibold text-fashion-text font-playfair dark:text-[#FEF7CD]">Get Recommendations</h3>
                <p className="text-fashion-muted dark:text-[#E5DEFF]/80">Receive personalized fashion advice and trends</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
