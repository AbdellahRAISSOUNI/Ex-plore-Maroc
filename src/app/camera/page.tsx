'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCamera, FiRefreshCw, FiInfo, FiX, FiZap, FiImage, FiMapPin } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { CameraView } from '@/components/camera/camera-view';
import { MockRecognitionTool } from '@/components/camera/image-recognition';
import { isMobile } from '@/lib/utils';
import { RecognitionResult } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { mockLocations } from '@/lib/mock-data';

// Featured monuments to showcase in the demo
const FEATURED_MONUMENTS = [
  'jemaa-el-fna',
  'hassan-tower',
  'bahia-palace'
];

export default function CameraPage() {
  const router = useRouter();
  const { authState } = useAuth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedMonument, setSelectedMonument] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recognitionCount, setRecognitionCount] = useState(0);
  const confettiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if we're on desktop to show the mock tool
    setIsDesktopMode(!isMobile());
    
    // Load recognition count from localStorage
    const savedCount = localStorage.getItem('recognitionCount');
    if (savedCount) {
      setRecognitionCount(parseInt(savedCount, 10));
    }
    
    return () => {
      // Clear any timeouts when component unmounts
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }
    };
  }, []);

  // When a monument is selected, redirect to results page
  useEffect(() => {
    if (selectedMonument) {
      // Increment recognition count
      const newCount = recognitionCount + 1;
      setRecognitionCount(newCount);
      localStorage.setItem('recognitionCount', newCount.toString());
      
      // Show confetti for milestone achievements
      if (newCount === 1 || newCount % 5 === 0) {
        setShowConfetti(true);
        confettiTimeoutRef.current = setTimeout(() => {
          setShowConfetti(false);
          router.push(`/results?locationId=${selectedMonument}&confidence=98`);
        }, 2000);
      } else {
        // Short delay to show the captured image before redirecting
        setTimeout(() => {
          router.push(`/results?locationId=${selectedMonument}&confidence=98`);
        }, 800);
      }
    }
  }, [selectedMonument, router, recognitionCount]);

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsProcessing(true);
    
    // For demo purposes, randomly select one of the featured monuments
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * FEATURED_MONUMENTS.length);
      setSelectedMonument(FEATURED_MONUMENTS[randomIndex]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleMockSelection = (result: RecognitionResult) => {
    setSelectedMonument(result.locationId);
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setSelectedMonument(null);
    setIsProcessing(false);
  };

  const selectFromGallery = (locationId: string) => {
    // Directly set the selected monument without image capture
    setSelectedMonument(locationId);
  };

  // Confetti component
  const Confetti = () => (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: [
              '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
              '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
              '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
              '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
            ][Math.floor(Math.random() * 16)],
            top: `${Math.random() * -10}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <motion.div 
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          🎉
        </motion.div>
        <h2 className="text-xl font-bold mb-2">
          {recognitionCount === 1 
            ? "First landmark recognized!" 
            : `${recognitionCount} landmarks recognized!`}
        </h2>
        <p className="text-gray-500">
          {recognitionCount === 1 
            ? "Great start to your Moroccan adventure!" 
            : "You're becoming a Morocco expert!"}
        </p>
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen pb-20">
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FiArrowLeft className="w-5 h-5" />
              </div>
            </Link>
            <h1 className="text-lg font-semibold">Camera</h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowTips(!showTips)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <FiInfo className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowGallery(!showGallery)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <FiImage className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Tips overlay */}
      <AnimatePresence>
        {showTips && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Camera Tips</h2>
                <button 
                  onClick={() => setShowTips(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[var(--primary-light)]/10 p-2 rounded-full mr-3">
                    <FiCamera className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hold steady</h3>
                    <p className="text-sm text-gray-500">Keep your camera still for the best recognition results.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[var(--primary-light)]/10 p-2 rounded-full mr-3">
                    <FiZap className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Good lighting</h3>
                    <p className="text-sm text-gray-500">Ensure the landmark is well-lit for better recognition.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[var(--primary-light)]/10 p-2 rounded-full mr-3">
                    <FiRefreshCw className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Try different angles</h3>
                    <p className="text-sm text-gray-500">If recognition fails, try capturing from a different angle.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-gray-400 text-center">
                    This is a demo app. In a real application, the camera would use AI to recognize actual landmarks.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery overlay */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Select from Gallery</h2>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {mockLocations.filter(loc => FEATURED_MONUMENTS.includes(loc.id)).map((location) => (
                  <motion.div 
                    key={location.id}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectFromGallery(location.id)}
                  >
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-2">
                        <p className="text-white text-sm font-medium">{location.name}</p>
                        <div className="flex items-center mt-1">
                          <FiMapPin className="w-3 h-3 text-white/80 mr-1" />
                          <p className="text-white/80 text-xs">{location.category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center">
                Select an image to simulate taking a photo of that landmark
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        {/* Welcome message with recognition count */}
        {!capturedImage && !isProcessing && (
          <div className="text-center mb-6 stagger-children">
            <h2 className="text-xl font-bold mb-2">Welcome, {authState.user?.firstName || 'Explorer'}!</h2>
            <p className="text-gray-500 mb-2">
              Capture a Moroccan monument to start exploring its details and nearby attractions.
            </p>
            {recognitionCount > 0 && (
              <div className="inline-block bg-[var(--primary-light)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-sm">
                <span className="font-medium">{recognitionCount}</span> landmarks recognized so far
              </div>
            )}
          </div>
        )}
        
        {isProcessing ? (
          <div className="text-center p-4">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)]/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiCamera className="w-8 h-8 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Image</h3>
            <p className="text-gray-500">Identifying Moroccan landmarks...</p>
            <div className="mt-4 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--primary)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        ) : capturedImage ? (
          <div className="w-full max-w-md">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              {/* Device frame overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 border-[12px] border-black rounded-[24px]">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gray-800 rounded-full"></div>
              </div>
              <Image 
                src={capturedImage} 
                alt="Captured image" 
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-4 flex justify-center space-x-3">
              <Button 
                variant="outline" 
                onClick={resetCamera}
                className="flex items-center"
              >
                <FiRefreshCw className="mr-2" />
                Retake
              </Button>
            </div>
          </div>
        ) : isDesktopMode ? (
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">Desktop Testing Mode</h2>
              <p className="text-gray-500">
                Camera functionality works best on mobile devices. For desktop testing, please use the mock tool below.
              </p>
            </div>
            <MockRecognitionTool onSelect={handleMockSelection} />
          </div>
        ) : (
          <CameraView 
            onCapture={handleCapture}
            onError={() => {}}
          />
        )}
      </div>
    </main>
  );
} 