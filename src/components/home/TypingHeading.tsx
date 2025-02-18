
import React, { useState, useEffect } from 'react';

const fashionQuotes = [
  "Style is a way to say who you are without having to speak",
  "Fashion is the armor to survive everyday life",
  "Fashion is the most powerful art there is",
  "Fashion is about dressing according to what's fashionable; style is more about being yourself",
  "Life is too short to wear boring clothes",
  "Style is something each of us already has, all we need to do is find it",
  "Fashion fades, style is eternal",
  "Dress like everyday is a runway"
];

export const TypingHeading = () => {
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
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fashion-text dark:text-[#F2FCE2] font-playfair tracking-tight py-8">
      {displayedText}
    </h1>
  );
};
