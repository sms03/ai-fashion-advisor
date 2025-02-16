
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CallToAction = () => {
  return (
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
  );
};
