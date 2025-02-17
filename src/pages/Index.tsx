
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
      <TypingHeading />
      <Navigation />
      <HeroSection />
      <WorldwideTrends />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
