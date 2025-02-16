import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Camera, Zap, Palette, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const fashionQuotes = [
    "Style is a way to say who you are without having to speak",
    "Fashion is the armor to survive everyday life",
    "Fashion is the most powerful art there is",
    "Fashion is about dressing according to what's fashionable; style is more about being yourself"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex < fashionQuotes[currentQuoteIndex].length) {
        currentText += fashionQuotes[currentQuoteIndex][currentIndex];
        setDisplayedText(currentText);
        currentIndex++;
        setTimeout(typeText, 50);
      } else {
        setTimeout(() => {
          setCurrentQuoteIndex((prev) => (prev + 1) % fashionQuotes.length);
          setDisplayedText('');
        }, 3000);
      }
    };

    setDisplayedText('');
    typeText();
  }, [currentQuoteIndex]);

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

  const worldwideTrends = [
    {
      country: "France",
      trend: "Sustainable Luxury",
      description: "Eco-conscious haute couture and minimalist elegance",
      color: "bg-[#F2FCE2]",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      country: "Japan",
      trend: "Tech-Wear Fusion",
      description: "Modern technology meets traditional fashion elements",
      color: "bg-[#FEF7CD]",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    },
    {
      country: "Italy",
      trend: "Artisanal Revival",
      description: "Handcrafted details and traditional craftsmanship",
      color: "bg-[#FFDEE2]",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
    },
    {
      country: "South Korea",
      trend: "Street Style Evolution",
      description: "Bold colors and innovative layering techniques",
      color: "bg-[#E5DEFF]",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    },
    {
      country: "USA",
      trend: "Comfort Luxury",
      description: "Elevated casual wear with premium materials",
      color: "bg-[#D3E4FD]",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      <div className="absolute top-0 left-0 w-full text-center p-4 bg-black/5 backdrop-blur-sm">
        <p className="font-playfair text-xl text-fashion-text h-8">
          {displayedText}
        </p>
      </div>

      <nav className="absolute top-12 right-0 p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/about')}
            className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
          >
            About Us
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth?mode=login')}
            className="bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
          >
            Sign In
          </Button>
          <Button 
            variant="default" 
            onClick={() => navigate('/auth?mode=signup')}
            className="bg-[#FEF7CD] text-[#1B1B1B] hover:bg-[#FCF0B0] border-[#E5E5E5]"
          >
            Sign Up
          </Button>
        </div>
      </nav>

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

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center px-4 py-2 
            bg-white/80 backdrop-blur-sm rounded-full text-fashion-text mb-4">
            <Globe className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">Global Fashion Trends</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-fashion-text">
            Trending Worldwide
          </h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {worldwideTrends.map((trend, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div 
                  className={`${trend.color} p-6 rounded-xl h-full transform transition-all duration-300 hover:scale-105 bg-opacity-80 backdrop-blur-sm`}
                >
                  <div className="space-y-4">
                    <div className="h-48 rounded-lg overflow-hidden">
                      <img 
                        src={trend.image} 
                        alt={`${trend.country} fashion trend`}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-fashion-text">{trend.country}</h3>
                    <div className="text-lg font-medium text-fashion-text">{trend.trend}</div>
                    <p className="text-fashion-muted">{trend.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

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

      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl text-center space-y-6">
          <h2 className="text-2xl font-semibold text-fashion-text">Ready to Transform Your Style?</h2>
          <p className="text-fashion-muted max-w-2xl mx-auto">
            Join thousands of fashion-forward individuals who are already using our AI-powered fashion advisor.
          </p>
          <Button 
            asChild
            className="bg-[#FEF7CD] text-[#1B1B1B] hover:bg-[#FCF0B0] border-[#E5E5E5]"
          >
            <Link to="/auth?mode=signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
