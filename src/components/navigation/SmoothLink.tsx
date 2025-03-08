"use client";

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SmoothLink({ href, children, className = '', onClick }: SmoothLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Execute any additional onClick handler if provided
    if (onClick) {
      onClick();
    }
    
    // Use router.push for client-side navigation
    router.push(href);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
    >
      {children}
    </a>
  );
} 