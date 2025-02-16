
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative py-32 px-4">
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
  );
};
