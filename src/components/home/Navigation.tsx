
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Navigation = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="absolute top-24 right-0 p-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
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
  );
};
