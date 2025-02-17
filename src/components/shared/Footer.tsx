
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-sm dark:bg-black/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold text-fashion-text dark:text-[#F2FCE2]">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF] transition-colors">About Us</Link></li>
              <li><span className="text-fashion-muted dark:text-[#E5DEFF]/80">© 2024 Fashion AI. All rights reserved.</span></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold text-fashion-text dark:text-[#FEF7CD]">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold text-fashion-text dark:text-[#FFDEE2]">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF] transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF] transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold text-fashion-text dark:text-[#D3E4FD]">Contact</h3>
            <ul className="space-y-2">
              <li className="text-fashion-muted dark:text-[#E5DEFF]/80">Email: support@fashionai.com</li>
              <li className="text-fashion-muted dark:text-[#E5DEFF]/80">Phone: +1 (555) 123-4567</li>
              <li className="text-fashion-muted dark:text-[#E5DEFF]/80">Address: 123 Fashion Street, Style City, ST 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
