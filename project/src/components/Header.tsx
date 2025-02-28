import React, { useState } from 'react';
import { Bed, Plane, Sailboat, Train, Car, Binary as Binoculars, UserCircle2, Receipt, Contact, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1e3c7b] text-white w-full">
      <div className="bg-[#1e3c7b] pb-4 border-b border-[#2a4c8b]">
        <div className="w-full">
          <div className="flex items-center justify-between" style={{ paddingRight: "0.5rem", paddingLeft: "2rem" }}>
            <img 
              src="https://m.travelboutiqueonline.com/images/logo-alt.png" 
              alt="Travel Boutique Online" 
              className="h-9"
            />
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-xs">Mujahid Shaikh - A0001</span>
                <a href="#" className="text-xs text-[#246197] hover:text-[#1b4a75] transition-colors">(Edit Profile)</a>
                <button className="bg-[#4267b2] hover:bg-[#4b74c5] px-3 py-0.5 text-xs rounded transition-colors">
                  Logout
                </button>
              </div>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 hover:bg-[#4267b2] rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e3c7b]">
        <nav className="hidden lg:flex items-center gap-6 px-8 py-2">
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Plane className="h-4 w-4" />
            Flight
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Bed className="h-4 w-4" />
            Hotel
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Car className="h-4 w-4" />
            Car
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Train className="h-4 w-4" />
            Train
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Sailboat className="h-4 w-4" />
            Cruise
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Binoculars className="h-4 w-4" />
            Sightseeing
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <UserCircle2 className="h-4 w-4" />
            Profile
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Receipt className="h-4 w-4" />
            Bookings
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors">
            <Contact className="h-4 w-4" />
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};