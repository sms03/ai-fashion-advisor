
import React from 'react';
import { Camera, Sparkles, Palette } from 'lucide-react';

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

export const Features = () => {
  return (
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
  );
};
