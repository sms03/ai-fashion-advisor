
import React from 'react';
import { Globe } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export const WorldwideTrends = () => {
  return (
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
  );
};
