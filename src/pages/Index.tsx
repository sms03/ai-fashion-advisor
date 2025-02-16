
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { FashionQuotes } from '@/components/home/FashionQuotes';
import { Navigation } from '@/components/home/Navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { WorldwideTrends } from '@/components/home/WorldwideTrends';
import { Features } from '@/components/home/Features';
import { CallToAction } from '@/components/home/CallToAction';

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
    <div className="min-h-screen gradient-bg overflow-hidden">
      <FashionQuotes />
      <Navigation />
      <HeroSection />
      <WorldwideTrends />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;
