"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SmoothLink from './SmoothLink';
import { usePathname } from 'next/navigation';

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <SmoothLink href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="Ex-plore Maroc" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-teal-600">Ex-plore Maroc</span>
          </SmoothLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <SmoothLink 
              href="/" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/') ? 'text-teal-600 font-medium' : ''}`}
            >
              Home
            </SmoothLink>
            <SmoothLink 
              href="/attractions" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/attractions') ? 'text-teal-600 font-medium' : ''}`}
            >
              Attractions
            </SmoothLink>
            <SmoothLink 
              href="/hotels" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/hotels') ? 'text-teal-600 font-medium' : ''}`}
            >
              Hotels
            </SmoothLink>
            <SmoothLink 
              href="/restaurants" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/restaurants') ? 'text-teal-600 font-medium' : ''}`}
            >
              Restaurants
            </SmoothLink>
            <SmoothLink 
              href="/activities" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/activities') ? 'text-teal-600 font-medium' : ''}`}
            >
              Activities
            </SmoothLink>
            <SmoothLink 
              href="/map" 
              className={`text-gray-700 hover:text-teal-600 transition-colors ${isActive('/map') ? 'text-teal-600 font-medium' : ''}`}
            >
              Map
            </SmoothLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-2">
            <SmoothLink 
              href="/" 
              className={`block py-2 ${isActive('/') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Home
            </SmoothLink>
            <SmoothLink 
              href="/attractions" 
              className={`block py-2 ${isActive('/attractions') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Attractions
            </SmoothLink>
            <SmoothLink 
              href="/hotels" 
              className={`block py-2 ${isActive('/hotels') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Hotels
            </SmoothLink>
            <SmoothLink 
              href="/restaurants" 
              className={`block py-2 ${isActive('/restaurants') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Restaurants
            </SmoothLink>
            <SmoothLink 
              href="/activities" 
              className={`block py-2 ${isActive('/activities') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Activities
            </SmoothLink>
            <SmoothLink 
              href="/map" 
              className={`block py-2 ${isActive('/map') ? 'text-teal-600 font-medium' : 'text-gray-700'}`}
              onClick={closeMenu}
            >
              Map
            </SmoothLink>
          </div>
        </div>
      )}
    </nav>
  );
} 