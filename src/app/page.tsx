'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCamera, FiMapPin, FiCompass, FiInfo, FiStar, FiMap, FiSearch, FiHome, FiCoffee, FiZap } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/card';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SplashScreen } from '@/components/splash-screen';
import { mockLocations, mockCategories } from '@/lib/mock-data';
import SmoothLink from '@/components/navigation/SmoothLink';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      // Calculate transform here to avoid using window during render
      setTransform(`perspective(1000px) rotateX(${newScrollY * 0.01}deg) rotateY(${newScrollY * -0.01}deg)`);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Featured locations (first 3)
  const featuredLocations = mockLocations.slice(0, 3);

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
      <motion.header 
        className="sticky top-0 z-30 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white p-4 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
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
      </motion.header>

      {/* Main content */}
      <motion.div
        className="p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Search bar */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, hotels, restaurants..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
        </motion.div>

        {/* Hero section with camera button */}
        <motion.div 
          className="relative rounded-xl overflow-hidden h-56 shadow-lg"
          variants={itemVariants}
          style={{
            transformStyle: 'preserve-3d',
            transform: transform
          }}
        >
          <Image
            src="/images/marrakech.jpg"
            alt="Discover Morocco"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
            <h2 className="text-2xl font-bold mb-2">Discover Morocco</h2>
            <p className="mb-4 text-sm text-white/90">Point your camera at landmarks to learn more</p>
            <Link href="/camera">
              <Button 
                variant="secondary" 
                size="lg"
                className="rounded-full bg-white text-[var(--primary)] hover:bg-white/90"
              >
                <FiCamera className="w-5 h-5 mr-2" />
                Open Camera
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SmoothLink href="/attractions" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src="/images/marrakech.jpg"
                      alt="Attractions"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Attractions</h3>
                      <p className="text-sm opacity-90">Discover historical monuments</p>
                    </div>
                  </div>
                </div>
              </SmoothLink>
              
              <SmoothLink href="/hotels" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src="/images/bahia.jpg"
                      alt="Hotels"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Hotels</h3>
                      <p className="text-sm opacity-90">Find comfortable stays</p>
                    </div>
                  </div>
                </div>
              </SmoothLink>
              
              <SmoothLink href="/restaurants" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src="/images/hasssan-tower.jpg"
                      alt="Restaurants"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Restaurants</h3>
                      <p className="text-sm opacity-90">Experience local cuisine</p>
                    </div>
                  </div>
                </div>
              </SmoothLink>
              
              <SmoothLink href="/activities" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src="/images/marrakech.jpg"
                      alt="Activities"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Activities</h3>
                      <p className="text-sm opacity-90">Explore exciting experiences</p>
                    </div>
                  </div>
                </div>
              </SmoothLink>
            </div>
          </div>
        </section>

        {/* Featured Locations */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured Locations</h2>
            <Link href="/explore" className="text-sm text-[var(--primary)]">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {featuredLocations.map((location, index) => (
              <Link key={location.id} href={`/location/${location.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={location.image}
                        alt={location.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{location.name}</h3>
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
                    <CardContent className="p-3">
                      <CardDescription className="line-clamp-2 mt-1">
                        {location.shortDescription}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Quick access */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/camera">
              <Card className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
              <Card className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <FiMap className="w-8 h-8 mb-2" />
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
