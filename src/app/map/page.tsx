'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { mockLocations } from '@/lib/mock-data';

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter locations based on search and category
  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = searchQuery === '' || 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || location.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockLocations.map(location => location.category)));

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--primary)] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Explore Map</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Search and filters */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search locations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
          <button
            className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
              activeCategory === null
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative h-[calc(100vh-13rem)] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {/* Map background */}
            <div className="absolute inset-0 bg-[url('/images/map-background.svg')] bg-cover bg-center opacity-90 dark:opacity-70"></div>
            
            {/* Map overlay with location pins */}
            <div className="absolute inset-0">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${(location.coordinates.longitude + 10) * 3}%`,
                    top: `${(location.coordinates.latitude - 25) * -2}%`,
                  }}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[150px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{location.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{location.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
} 