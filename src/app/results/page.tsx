'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiClock, FiStar, FiCamera, FiArrowLeft, FiHeart, FiShare2, FiInfo, FiMapPin as FiMapPinIcon, FiNavigation } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { mockLocations, mockHotels, mockRestaurants } from '@/lib/mock-data';
import { Location } from '@/types';
import { useAuth } from '@/lib/auth-context';

// Separate component that uses useSearchParams
function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout } = useAuth();
  const locationId = searchParams.get('locationId');
  const confidence = searchParams.get('confidence');
  
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (locationId) {
      const foundLocation = mockLocations.find(loc => loc.id === locationId);
      setLocation(foundLocation || null);
      
      // Track visited location for achievements
      if (foundLocation) {
        const visitedLocations = JSON.parse(localStorage.getItem('visitedLocations') || '[]');
        if (!visitedLocations.includes(foundLocation.id)) {
          visitedLocations.push(foundLocation.id);
          localStorage.setItem('visitedLocations', JSON.stringify(visitedLocations));
        }
      }
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [locationId]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get nearby hotels and restaurants
  const nearbyHotels = mockHotels.slice(0, 2);
  const nearbyRestaurants = mockRestaurants.slice(0, 2);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1.2, opacity: 0.8 },
    animate: (scrollY: number) => ({ 
      scale: 1 + (scrollY * 0.0005), 
      opacity: 1 - (scrollY * 0.002),
      transition: { duration: 0.1 }
    })
  };

  const handleScanAnother = () => {
    router.push('/camera');
  };
  
  if (!location) {
    return (
      <main className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 rounded-full bg-[var(--primary-light)]/20 flex items-center justify-center text-[var(--primary)] mx-auto mb-4">
            <FiInfo className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Location Not Found</h2>
          <p className="text-gray-500 mb-4">The location you're looking for could not be found.</p>
          <Button onClick={() => router.push('/camera')} className="bg-[var(--primary)]">Back to Camera</Button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen pb-20">
      {/* Location Image Header with parallax effect */}
      <div className="relative h-[40vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          variants={imageVariants}
          initial="initial"
          animate={imageVariants.animate(scrollPosition)}
        >
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        </motion.div>
        
        {/* App header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Recognition confidence */}
        <div className="absolute top-16 right-4 z-20 bg-black/30 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full">
          {confidence}% Match
        </div>
        
        {/* Location name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
          <h1 className="text-2xl font-bold mb-1">{location.name}</h1>
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-3">
              <FiMapPin className="w-4 h-4 mr-1" />
              <span>{location.category}</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <FiStar className="w-4 h-4 mr-1" />
              <span>{location.rating}</span>
              <span className="ml-1 text-white/70">({location.reviews})</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex space-x-4 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`py-4 font-medium text-sm relative ${activeTab === 'overview' ? 'text-[var(--primary)]' : 'text-gray-500'}`}
        >
          Overview
          {activeTab === 'overview' && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
              layoutId="activeTab"
            />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('details')}
          className={`py-4 font-medium text-sm relative ${activeTab === 'details' ? 'text-[var(--primary)]' : 'text-gray-500'}`}
        >
          Details
          {activeTab === 'details' && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
              layoutId="activeTab"
            />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('nearby')}
          className={`py-4 font-medium text-sm relative ${activeTab === 'nearby' ? 'text-[var(--primary)]' : 'text-gray-500'}`}
        >
          Nearby
          {activeTab === 'nearby' && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
              layoutId="activeTab"
            />
          )}
        </button>
      </div>
      
      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 space-y-6"
        >
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-base leading-relaxed">{location.description}</p>
                    
                    {location.openingHours && (
                      <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <FiClock className="w-4 h-4 mr-2" />
                        <span>Open: {location.openingHours.open} - {location.openingHours.close}</span>
                      </div>
                    )}
                    
                    {location.price && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium">Entrance fee: </span>
                        <span className="text-[var(--primary)] font-semibold">{location.price} {location.currency}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Photos */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FiCamera className="mr-2" />
                  Photos
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={`/images/locations/${location.id}-${i}.jpg`}
                        alt={`${location.name} photo ${i}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = location.image.replace('.svg', '.jpg');
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
              
              {/* Action Button */}
              <div className="fixed bottom-20 left-0 right-0 px-4 z-20">
                <Button 
                  className="w-full py-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-lg shadow-[var(--primary)]/20"
                  onClick={handleScanAnother}
                >
                  <FiCamera className="mr-2" />
                  Scan Another Landmark
                </Button>
              </div>
            </>
          )}
          
          {activeTab === 'details' && (
            <>
              {/* Historical Information */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FiInfo className="mr-2" />
                  Historical Information
                </h2>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed">{location.historicalInfo}</p>
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Location */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FiMapPinIcon className="mr-2" />
                  Location
                </h2>
                <div className="relative h-[30vh] rounded-lg overflow-hidden">
                  <Image
                    src="/images/map-background.svg"
                    alt="Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center max-w-xs">
                      <p className="text-sm">Interactive map will be available in the full version.</p>
                      <p className="text-xs text-gray-500 mt-1">Coordinates: {location.coordinates.latitude}, {location.coordinates.longitude}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                  >
                    <FiNavigation className="mr-2" />
                    Get Directions
                  </Button>
                </div>
              </motion.section>
            </>
          )}
          
          {activeTab === 'nearby' && (
            <>
              {/* Nearby Hotels */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Nearby Hotels</h2>
                  <Link href="/category/hotels" className="text-sm text-[var(--primary)]">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {nearbyHotels.map(hotel => (
                    <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                      <Card className="overflow-hidden border-none shadow-lg h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative h-28">
                          <Image
                            src={hotel.image.replace('.svg', '.jpg')}
                            alt={hotel.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
                          <div className="absolute bottom-2 left-2 flex items-center text-white text-xs">
                            <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{hotel.rating}</span>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <CardTitle className="text-sm line-clamp-1">{hotel.name}</CardTitle>
                          <div className="mt-1 text-xs font-medium text-[var(--primary)]">
                            {hotel.price} {hotel.currency}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.section>
              
              {/* Nearby Restaurants */}
              <motion.section 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Nearby Restaurants</h2>
                  <Link href="/category/restaurants" className="text-sm text-[var(--primary)]">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {nearbyRestaurants.map(restaurant => (
                    <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                      <Card className="overflow-hidden border-none shadow-lg h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative h-28">
                          <Image
                            src={restaurant.image.replace('.svg', '.jpg')}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
                          <div className="absolute bottom-2 left-2 flex items-center text-white text-xs">
                            <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <CardTitle className="text-sm line-clamp-1">{restaurant.name}</CardTitle>
                          <div className="mt-1 text-xs text-gray-500">
                            {restaurant.priceRange} • {restaurant.cuisine[0]}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.section>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

// Main component with Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
} 