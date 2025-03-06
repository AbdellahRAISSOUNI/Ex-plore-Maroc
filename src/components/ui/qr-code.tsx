import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface QRCodeGeneratorProps {
  title?: string;
  description?: string;
  className?: string;
}

export function QRCodeGenerator({ 
  title = 'Test on Mobile Device', 
  description = 'Scan this QR code with your mobile device to test the app',
  className 
}: QRCodeGeneratorProps) {
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    // Get the current URL in the browser
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin);
    }
  }, []);
  
  if (!url) return null;
  
  return (
    <Card className={className}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription className="mb-4">{description}</CardDescription>
        
        <div className="bg-white p-4 rounded-lg">
          <QRCode
            size={180}
            value={url}
            viewBox={`0 0 180 180`}
          />
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          URL: {url}
        </p>
      </CardContent>
    </Card>
  );
} 