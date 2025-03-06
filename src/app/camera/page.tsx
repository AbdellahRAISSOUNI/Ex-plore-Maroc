'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { CameraView } from '@/components/camera/camera-view';
import { ImageRecognition, MockRecognitionTool } from '@/components/camera/image-recognition';
import { isMobile } from '@/lib/utils';
import { RecognitionResult } from '@/types';
import { useAuth } from '@/lib/auth-context';

export default function CameraPage() {
  const router = useRouter();
  const { authState, logout } = useAuth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    // Check if we're on desktop to show the mock tool
    setIsDesktopMode(!isMobile());
  }, []);

  // If we have a recognition result, navigate to the results page
  useEffect(() => {
    if (recognitionResult) {
      router.push(`/results?locationId=${recognitionResult.locationId}&confidence=${recognitionResult.confidence}`);
    }
  }, [recognitionResult, router]);

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsProcessing(true);
  };

  const handleRecognitionResult = (result: RecognitionResult | null) => {
    setRecognitionResult(result);
    setIsProcessing(false);
  };

  const handleRecognitionError = (errorMessage: string) => {
    setError(errorMessage);
    setIsProcessing(false);
  };

  const handleMockSelection = (result: RecognitionResult) => {
    setRecognitionResult(result);
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setRecognitionResult(null);
    setError(null);
    setIsProcessing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

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
            <h1 className="text-lg font-semibold">Explore Maroc</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        {/* Welcome message */}
        {!capturedImage && !isProcessing && !error && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Welcome, {authState.user?.firstName || 'Explorer'}!</h2>
            <p className="text-gray-500 mb-4">
              Capture a Moroccan monument to start exploring its details and nearby attractions.
            </p>
          </div>
        )}
        
        {isProcessing ? (
          <div className="text-center p-4">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Image</h3>
            <p className="text-gray-500">Identifying Moroccan landmarks...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={resetCamera}>Try Again</Button>
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
            
            <ImageRecognition 
              imageSrc={capturedImage}
              onResult={handleRecognitionResult}
              onError={handleRecognitionError}
            />
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
            onError={(errorMsg) => setError(errorMsg)}
          />
        )}
      </div>

      {/* Mobile Navigation - Hidden on this page */}
    </main>
  );
} 