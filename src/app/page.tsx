'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCamera, FiMapPin, FiCompass, FiInfo } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/card';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SplashScreen } from '@/components/splash-screen';
import { mockLocations, mockCategories } from '@/lib/mock-data';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Featured locations (first 2)
  const featuredLocations = mockLocations.slice(0, 2);

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

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Mobile device frame */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-black rounded-[40px] shadow-xl hidden md:block">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--primary)] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo.svg"
                alt="Explore Maroc"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold">Explore Maroc</h1>
          </div>
          <Link href="/profile">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <FiInfo className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <motion.div
        className="p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Hero section with camera button */}
        <motion.div 
          className="relative rounded-xl overflow-hidden h-48 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)]"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
            <h2 className="text-xl font-bold mb-2">Discover Morocco</h2>
            <p className="mb-4 text-sm text-white/80">Point your camera at landmarks to learn more</p>
            <Link href="/camera">
              <Button 
                variant="secondary" 
                size="lg"
                className="rounded-full"
                leftIcon={<FiCamera className="w-5 h-5" />}
              >
                Open Camera
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3">Explore By Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] text-white flex items-center justify-center mb-2">
                      {category.icon === 'hotel' && <FiMapPin className="w-6 h-6" />}
                      {category.icon === 'restaurant' && <FiMapPin className="w-6 h-6" />}
                      {category.icon === 'attraction' && <FiCompass className="w-6 h-6" />}
                      {category.icon === 'transport' && <FiMapPin className="w-6 h-6" />}
                    </div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{category.count} places</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Featured Locations */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured Locations</h2>
            <Link href="/explore" className="text-sm text-[var(--primary)]">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {featuredLocations.map((location) => (
              <Link key={location.id} href={`/location/${location.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardImage
                    src={location.image}
                    alt={location.name}
                    aspectRatio="16:9"
                    width={400}
                    height={225}
                  />
                  <CardContent className="p-3">
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {location.shortDescription}
                    </CardDescription>
                    <div className="flex items-center mt-2 text-sm">
                      <div className="flex items-center text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1">{location.rating}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span className="text-gray-500">{location.category}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Quick access */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/camera">
              <Card className="bg-[var(--secondary-light)] text-white hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <FiCamera className="w-8 h-8 mb-2" />
                  <CardTitle className="text-white">Camera</CardTitle>
                  <CardDescription className="text-white/80 text-xs mt-1">
                    Scan landmarks
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/map">
              <Card className="bg-[var(--primary-light)] text-white hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <FiMapPin className="w-8 h-8 mb-2" />
                  <CardTitle className="text-white">Map</CardTitle>
                  <CardDescription className="text-white/80 text-xs mt-1">
                    Find nearby places
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.section>
      </motion.div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
