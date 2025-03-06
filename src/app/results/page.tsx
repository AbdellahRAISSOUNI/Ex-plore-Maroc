'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiStar, FiCamera, FiLogOut } from 'react-icons/fi';
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
  
  useEffect(() => {
    if (locationId) {
      const foundLocation = mockLocations.find(loc => loc.id === locationId);
      setLocation(foundLocation || null);
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [locationId]);
  
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleScanAnother = () => {
    router.push('/camera');
  };
  
  if (!location) {
    return (
      <main className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-bold mb-2">Location Not Found</h2>
          <p className="text-gray-500 mb-4">The location you&apos;re looking for could not be found.</p>
          <Button onClick={() => router.push('/camera')}>Back to Camera</Button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen pb-20">
      {/* Mobile device frame */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-black rounded-[40px] shadow-xl hidden md:block">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl"></div>
      </div>
      
      {/* Location Image Header */}
      <div className="relative h-64">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* App header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-white/20 rounded-full overflow-hidden">
              <Image
                src="/images/logo.svg"
                alt="Explore Maroc"
                fill
                className="object-contain p-1"
              />
            </div>
            <h1 className="text-lg font-semibold text-white">Explore Maroc</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Recognition confidence */}
        <div className="absolute top-16 right-4 z-20 bg-black/30 text-white text-sm px-3 py-1 rounded-full">
          {confidence}% Match
        </div>
        
        {/* Location name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
          <h1 className="text-2xl font-bold">{location.name}</h1>
          <div className="flex items-center mt-1">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location.category}</span>
            <div className="flex items-center ml-3">
              <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-sm">{location.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <motion.div
        className="p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Description */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardContent className="p-4">
              <p>{location.description}</p>
              
              {location.openingHours && (
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>Open: {location.openingHours.open} - {location.openingHours.close}</span>
                </div>
              )}
              
              {location.price && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Entrance fee: </span>
                  <span>{location.price} {location.currency}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>
        
        {/* Historical Information */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3">Historical Information</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">{location.historicalInfo}</p>
            </CardContent>
          </Card>
        </motion.section>
        
        {/* Nearby Hotels */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Nearby Hotels</h2>
            <Link href="/category/hotels" className="text-sm text-[var(--primary)]">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {nearbyHotels.map(hotel => (
              <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-24">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm">{hotel.name}</CardTitle>
                    <div className="flex items-center mt-1 text-xs">
                      <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{hotel.rating}</span>
                    </div>
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
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Nearby Restaurants</h2>
            <Link href="/category/restaurants" className="text-sm text-[var(--primary)]">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {nearbyRestaurants.map(restaurant => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-24">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm">{restaurant.name}</CardTitle>
                    <div className="flex items-center mt-1 text-xs">
                      <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="mt-1 text-xs">
                      {restaurant.priceRange} • {restaurant.cuisine[0]}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>
        
        {/* Action buttons */}
        <motion.section variants={itemVariants} className="flex space-x-3">
          <Button 
            variant="primary" 
            className="flex-1"
            leftIcon={<FiMapPin className="w-4 h-4" />}
            onClick={() => router.push(`/map?lat=${location.coordinates.latitude}&lng=${location.coordinates.longitude}`)}
          >
            View on Map
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            leftIcon={<FiCamera className="w-4 h-4" />}
            onClick={handleScanAnother}
          >
            Scan Another
          </Button>
        </motion.section>
      </motion.div>
    </main>
  );
}

// Main component with Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
} 