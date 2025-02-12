
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ScenarioInput from '../components/ScenarioInput';
import { Camera, Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleScenarioSubmit = (scenario: string) => {
    console.log('Scenario:', scenario);
    console.log('Image:', selectedImage);
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center justify-center px-4 py-2 
            bg-secondary rounded-full text-fashion-text mb-4 border border-fashion-border">
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">AI-Powered Fashion Advice</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fashion-text tracking-tight">
            Your Personal<br />AI Fashion Advisor
          </h1>
          <p className="text-lg text-fashion-muted max-w-2xl mx-auto leading-relaxed">
            Upload your photo and describe your scenario. Our AI will provide personalized fashion advice and outfit suggestions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-4 pb-24 space-y-12">
        <div className="space-y-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-fashion-text">
              <Camera className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold tracking-tight">Upload Your Photo</h2>
            </div>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-fashion-text tracking-tight">
              Describe Your Scenario
            </h2>
            <ScenarioInput onScenarioSubmit={handleScenarioSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
