'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FiCamera, FiRefreshCw, FiZap, FiCameraOff, FiVideo } from 'react-icons/fi';
import { isMobile } from '@/lib/utils';

interface CameraViewProps {
  onCapture: (imageSrc: string) => void;
  onError?: (error: string) => void;
}

export function CameraView({ onCapture, onError }: CameraViewProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [showOverlay, setShowOverlay] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  const [showFocusPoint, setShowFocusPoint] = useState(false);
  const [focusPosition, setFocusPosition] = useState({ x: 50, y: 50 });
  const [showGuide, setShowGuide] = useState(true);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  };

  // Hide guide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
    setPermissionDenied(false);
  }, []);

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error('Camera error:', error);
    setIsCameraReady(false);
    setPermissionDenied(true);
    if (onError) {
      onError(typeof error === 'string' ? error : error.message);
    }
  }, [onError]);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      // Show flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 300);
      
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  const switchCamera = useCallback(() => {
    setFacingMode(prevMode => 
      prevMode === 'user' ? 'environment' : 'user'
    );
  }, []);

  const handleScreenTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCameraReady) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setFocusPosition({ x, y });
    setShowFocusPoint(true);
    setTimeout(() => setShowFocusPoint(false), 1000);
  }, [isCameraReady]);

  // Check if device is mobile for camera switching
  const isDeviceMobile = isMobile();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {permissionDenied ? (
        <motion.div 
          className="text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <FiCameraOff className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Camera Access Denied</h3>
          <p className="mb-4 text-gray-500">Please allow camera access to use this feature.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </Button>
        </motion.div>
      ) : (
        <>
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg bg-black"
            onClick={handleScreenTap}
          >
            {/* Device frame overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 border-[12px] border-black rounded-[24px]">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gray-800 rounded-full"></div>
            </div>
            
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="w-full h-full object-cover"
              mirrored={facingMode === 'user'}
            />
            
            {/* Camera UI overlays */}
            {showOverlay && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Corner brackets for framing */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/70"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/70"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/70"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/70"></div>
                
                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center">
                  <div className="w-full h-px bg-white/30"></div>
                  <div className="absolute w-px h-full bg-white/30"></div>
                </div>
                
                {/* Focus point */}
                <AnimatePresence>
                  {showFocusPoint && (
                    <motion.div 
                      className="absolute w-12 h-12 pointer-events-none"
                      style={{ 
                        left: `calc(${focusPosition.x}% - 24px)`, 
                        top: `calc(${focusPosition.y}% - 24px)` 
                      }}
                      initial={{ opacity: 0, scale: 1.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 border-2 border-yellow-400 rounded-full"></div>
                      <div className="absolute inset-2 border border-yellow-400 rounded-full"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Camera guide */}
                <AnimatePresence>
                  {showGuide && (
                    <motion.div 
                      className="absolute bottom-24 left-0 right-0 flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                        Point camera at a landmark and tap to focus
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Flash effect */}
            <AnimatePresence>
              {showFlash && (
                <motion.div 
                  className="absolute inset-0 bg-white z-30 pointer-events-none"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
            
            {/* Camera controls */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center z-20">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="rounded-full w-16 h-16 bg-white bg-opacity-80 hover:bg-white flex items-center justify-center shadow-lg"
                onClick={capture}
                disabled={!isCameraReady}
              >
                <div className="rounded-full w-14 h-14 border-2 border-[var(--primary)] flex items-center justify-center">
                  <FiCamera className="w-8 h-8 text-[var(--primary)]" />
                </div>
              </motion.button>
              
              {isDeviceMobile && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-6 bottom-0 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
                  onClick={switchCamera}
                >
                  <FiRefreshCw className="w-5 h-5 text-[var(--primary)]" />
                </motion.button>
              )}
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute left-6 bottom-0 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
                onClick={() => setShowOverlay(!showOverlay)}
              >
                <FiVideo className="w-5 h-5 text-[var(--primary)]" />
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            className="mt-4 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>Point your camera at a Moroccan landmark</p>
          </motion.div>
        </>
      )}
    </div>
  );
} 