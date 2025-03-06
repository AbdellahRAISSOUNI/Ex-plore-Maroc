import { useEffect } from 'react';
import { mockLocations } from '@/lib/mock-data';
import { delay } from '@/lib/utils';
import { RecognitionResult } from '@/types';

interface ImageRecognitionProps {
  imageSrc: string;
  onResult: (result: RecognitionResult | null) => void;
  onError?: (error: string) => void;
}

export function ImageRecognition({ imageSrc, onResult, onError }: ImageRecognitionProps) {
  useEffect(() => {
    let isMounted = true;
    
    const processImage = async () => {
      try {
        // Simulate API delay
        await delay(2000);
        
        if (!isMounted) return;
        
        // Mock recognition logic - in a real app, this would call a vision API
        // For demo purposes, we'll randomly select a location from our mock data
        const randomIndex = Math.floor(Math.random() * mockLocations.length);
        const recognizedLocation = mockLocations[randomIndex];
        
        // Add some randomness to confidence score (70-95%)
        const confidence = 70 + Math.floor(Math.random() * 25);
        
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
  }, [imageSrc, onResult, onError]);
  
  return null; // This is a logic component, no UI
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
          <button
            key={location.id}
            className="w-full text-left p-3 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => {
              onSelect({
                locationId: location.id,
                confidence: 85 + Math.floor(Math.random() * 10),
                timestamp: new Date().toISOString()
              });
            }}
          >
            <div className="font-medium">{location.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{location.shortDescription}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 