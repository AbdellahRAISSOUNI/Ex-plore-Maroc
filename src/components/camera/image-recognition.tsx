'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { mockLocations } from '@/lib/mock-data';
import { delay } from '@/lib/utils';
import { RecognitionResult } from '@/types';
import { FiCheckCircle, FiSearch, FiMapPin, FiStar } from 'react-icons/fi';

interface ImageRecognitionProps {
  imageSrc: string;
  onResult: (result: RecognitionResult | null) => void;
  onError?: (error: string) => void;
}

export function ImageRecognition({ imageSrc, onResult, onError }: ImageRecognitionProps) {
  const [processingStage, setProcessingStage] = useState<'analyzing' | 'matching' | 'complete' | null>(null);
  const [matchedLocation, setMatchedLocation] = useState<typeof mockLocations[0] | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const processImage = async () => {
      try {
        if (!isMounted) return;
        
        // Stage 1: Analyzing image
        setProcessingStage('analyzing');
        await delay(1000);
        
        if (!isMounted) return;
        
        // Stage 2: Matching landmarks
        setProcessingStage('matching');
        
        // Mock recognition logic - in a real app, this would call a vision API
        // For demo purposes, we'll randomly select a location from our mock data
        const randomIndex = Math.floor(Math.random() * mockLocations.length);
        const recognizedLocation = mockLocations[randomIndex];
        setMatchedLocation(recognizedLocation);
        
        // Simulate confidence score increasing
        for (let i = 0; i <= 20; i++) {
          if (!isMounted) return;
        
        // Add some randomness to confidence score (70-95%)
          const targetConfidence = 70 + Math.floor(Math.random() * 25);
          const currentConfidence = Math.min(targetConfidence, Math.floor(targetConfidence * (i / 20)));
          setConfidence(currentConfidence);
          
          await delay(100);
        }
        
        if (!isMounted) return;
        
        // Stage 3: Complete
        setProcessingStage('complete');
        await delay(500);
        
        if (!isMounted) return;
        
        const result: RecognitionResult = {
          locationId: recognizedLocation.id,
          confidence: confidence,
          timestamp: new Date().toISOString()
        };
        
        onResult(result);
      } catch (error) {
        console.error('Recognition error:', error);
        if (onError && isMounted) {
          onError(error instanceof Error ? error.message : 'Unknown error during image recognition');
        }
      }
    };
    
    if (imageSrc) {
      processImage();
    } else if (onError) {
      onError('No image provided for recognition');
    }
    
    return () => {
      isMounted = false;
    };
  }, [imageSrc, onResult, onError, confidence]);
  
  if (!processingStage) return null;
  
  return (
    <div className="mt-6">
      {processingStage === 'analyzing' && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center mb-2">
            <FiSearch className="w-5 h-5 text-[var(--primary)] mr-2" />
            <span className="font-medium">Analyzing image...</span>
          </div>
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--primary)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Detecting landmarks and features</p>
        </motion.div>
      )}
      
      {processingStage === 'matching' && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center mb-2">
            <FiMapPin className="w-5 h-5 text-[var(--primary)] mr-2" />
            <span className="font-medium">Matching landmarks...</span>
          </div>
          
          {matchedLocation && (
            <motion.div 
              className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-md overflow-hidden">
                  <Image 
                    src={matchedLocation.image.replace('.svg', '.jpg')}
                    alt={matchedLocation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-3 text-left">
                  <p className="font-medium">{matchedLocation.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="w-3 h-3 mr-1" />
                    <span>{matchedLocation.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Match confidence</span>
                  <span className="text-sm font-medium">{confidence}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-[var(--primary)]"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {processingStage === 'complete' && matchedLocation && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center justify-center mb-2 text-[var(--success)]">
            <FiCheckCircle className="w-6 h-6 mr-2" />
            <span className="font-medium">Match found!</span>
          </div>
          
          <motion.div 
            className="mt-1 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-md overflow-hidden">
                <Image 
                  src={matchedLocation.image.replace('.svg', '.jpg')}
                  alt={matchedLocation.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium text-lg">{matchedLocation.name}</p>
                <div className="flex items-center text-sm">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <FiStar className="w-3 h-3 mr-0.5" />
                    <span>{matchedLocation.rating}</span>
                  </div>
                  <span className="text-gray-500">{matchedLocation.category}</span>
                </div>
              </div>
            </div>
            
            <p className="mt-2 text-sm text-left text-gray-600 dark:text-gray-400">
              {matchedLocation.shortDescription}
            </p>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Match confidence: <span className="font-medium text-[var(--primary)]">{confidence}%</span>
              </div>
              <motion.div 
                className="text-xs text-[var(--primary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading details...
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {showDebugInfo && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
          <p>Stage: {processingStage}</p>
          <p>Confidence: {confidence}%</p>
          <p>Location: {matchedLocation?.name || 'None'}</p>
        </div>
      )}
    </div>
  );
}

// For testing on desktop without camera
export function MockRecognitionTool({ onSelect }: { onSelect: (result: RecognitionResult) => void }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-3">Desktop Testing Mode</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Select a landmark to simulate camera recognition:
      </p>
      <div className="space-y-2">
        {mockLocations.map(location => (
          <motion.button
            key={location.id}
            className="w-full text-left p-3 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelect({
                locationId: location.id,
                confidence: 85 + Math.floor(Math.random() * 10),
                timestamp: new Date().toISOString()
              });
            }}
          >
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded overflow-hidden mr-3">
                <Image
                  src={location.image.replace('.svg', '.jpg')}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
            <div className="font-medium">{location.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{location.shortDescription}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 