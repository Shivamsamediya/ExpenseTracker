import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex gap-8 text-sm sm:text-base">
          <a href="#" className="font-semibold relative group">
            Privacy
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="font-semibold relative group">
            Terms
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="font-semibold relative group">
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex gap-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transform hover:scale-110 transition-all duration-300">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transform hover:scale-110 transition-all duration-300">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transform hover:scale-110 transition-all duration-300">
            <FaInstagram />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transform hover:scale-110 transition-all duration-300">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm font-bold text-gray-300 tracking-wide">
        © 2025 Expense Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
