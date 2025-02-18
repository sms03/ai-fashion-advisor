
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/home/Navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { WorldwideTrends } from '@/components/home/WorldwideTrends';
import { Features } from '@/components/home/Features';
import { CallToAction } from '@/components/home/CallToAction';
import { TypingHeading } from '@/components/home/TypingHeading';
import { Footer } from '@/components/shared/Footer';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-bg overflow-hidden flex flex-col">
      <Navigation />
      
      <div className="relative flex-1 flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          <div className="w-full h-full animate-pulse">
            <svg 
              viewBox="0 0 24 24" 
              className="w-full h-full"
            >
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#F2FCE2" className="animate-gradient-shift">
                    <animate
                      attributeName="stop-color"
                      values="#F2FCE2;#FEF7CD;#FFDEE2;#E5DEFF;#D3E4FD;#F2FCE2"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#D3E4FD" className="animate-gradient-shift">
                    <animate
                      attributeName="stop-color"
                      values="#D3E4FD;#F2FCE2;#FEF7CD;#FFDEE2;#E5DEFF;#D3E4FD"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 w-full text-center">
          <TypingHeading />
        </div>
      </div>

      <HeroSection />
      <WorldwideTrends />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
