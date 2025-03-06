import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { FiCamera, FiRefreshCw } from 'react-icons/fi';
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

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  };

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

  // Check if device is mobile for camera switching
  const isDeviceMobile = isMobile();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {permissionDenied ? (
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-2">Camera Access Denied</h3>
          <p className="mb-4">Please allow camera access to use this feature.</p>
          <Button 
            onClick={() => window.location.reload()}
            leftIcon={<FiRefreshCw />}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg bg-black">
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
            
            {/* Camera UI overlay */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center z-20">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full w-16 h-16 bg-white bg-opacity-80 hover:bg-white flex items-center justify-center"
                onClick={capture}
                disabled={!isCameraReady}
              >
                <FiCamera className="w-8 h-8 text-[var(--primary)]" />
              </Button>
              
              {isDeviceMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-6 bottom-0 bg-white bg-opacity-80 rounded-full"
                  onClick={switchCamera}
                >
                  <FiRefreshCw className="w-5 h-5 text-[var(--primary)]" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Point your camera at a Moroccan landmark</p>
          </div>
        </>
      )}
    </div>
  );
} 