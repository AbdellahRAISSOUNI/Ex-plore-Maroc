'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [floatingElements, setFloatingElements] = useState<Array<{
    x: number;
    y: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    // Generate floating elements positions using window dimensions
    // This ensures window is only accessed on the client side
    const elements = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setFloatingElements(elements);
    
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, duration / 100);

    // Set timeout for completion
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/map-background.svg')] bg-no-repeat bg-cover"></div>
      </div>
      
      {/* Logo container with glow effect */}
      <div className="relative mb-8">
        <motion.div
          className="absolute -inset-4 rounded-full bg-white opacity-20 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="relative w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="w-24 h-24 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Image
              src="/images/logo.svg"
              alt="Explore Maroc"
              fill
              priority
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.h1
        className="text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Explore Maroc
      </motion.h1>
      
      <motion.p
        className="text-white/80 text-center max-w-xs mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Discover Morocco through your camera
      </motion.p>
      
      {/* Progress bar */}
      <motion.div
        className="w-48 h-1 bg-white/20 rounded-full overflow-hidden"
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "12rem" }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      
      {/* Animated dots */}
      <motion.div
        className="mt-8 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-white/10"
            initial={{
              x: element.x,
              y: element.y,
              scale: element.scale,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 100 - 50],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
} 