import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-red-700 to-black text-white mt-10">
  <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm">
    <div className="text-center sm:text-left mb-4 sm:mb-0">
      © {new Date().getFullYear()} <span className="font-semibold">SourceMates</span>. All rights reserved.
    </div>
    <div className="flex gap-6">
      <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
      <a href="#" className="hover:text-gray-300 transition">Terms</a>
      <a href="#" className="hover:text-gray-300 transition">Contact</a>
    </div>
  </div>
</footer>

    );
}

export default Footer;
