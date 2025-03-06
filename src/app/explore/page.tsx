'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiStar, FiMapPin } from 'react-icons/fi';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/card';
import { mockLocations, mockCategories } from '@/lib/mock-data';

export default function ExplorePage() {
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

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--primary)] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Explore Morocco</h1>
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
            placeholder="Search destinations..."
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
          {mockCategories.map((category) => (
            <button
              key={category.id}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Locations grid */}
      <div className="p-4">
        {!isLoaded ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full"></div>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No locations found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLocations.map((location) => (
              <Link key={location.id} href={`/location/${location.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <CardImage
                    src={location.image}
                    alt={location.name}
                    aspectRatio="16:9"
                    width={400}
                    height={225}
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{location.name}</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <FiMapPin className="mr-1" size={14} />
                          {location.category}
                        </p>
                      </div>
                      <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-md text-sm">
                        <FiStar className="mr-1" size={14} />
                        {location.rating}
                      </div>
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">
                      {location.shortDescription}
                    </CardDescription>
                    {location.price && (
                      <div className="mt-2 text-[var(--primary)] dark:text-[var(--primary-light)] font-medium">
                        {location.price} {location.currency}
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {location.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {location.tags.length > 3 && (
                        <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                          +{location.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
} 