
import React, { useState, useEffect } from 'react';

const fashionQuotes = [
  "Style is a way to say who you are without having to speak",
  "Fashion is the armor to survive everyday life",
  "Fashion is the most powerful art there is",
  "Fashion is about dressing according to what's fashionable; style is more about being yourself"
];

export const FashionQuotes = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

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

  return (
    <div className="absolute top-0 left-0 w-full text-center p-4 bg-black/5 backdrop-blur-sm">
      <p className="font-playfair text-xl text-fashion-text h-8">
        {displayedText}
      </p>
    </div>
  );
};
