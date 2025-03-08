'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  FiHome, 
  FiCamera, 
  FiMap, 
  FiCompass, 
  FiUser 
} from 'react-icons/fi';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: <FiHome className="w-6 h-6" />
  },
  {
    href: '/camera',
    label: 'Camera',
    icon: <FiCamera className="w-6 h-6" />
  },
  {
    href: '/explore',
    label: 'Explore',
    icon: <FiCompass className="w-6 h-6" />
  },
  {
    href: '/map',
    label: 'Map',
    icon: <FiMap className="w-6 h-6" />
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: <FiUser className="w-6 h-6" />
  }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 h-16 px-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-between relative">
        {/* Background highlight for active item */}
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          if (isActive) {
            return (
              <motion.div
                key={`bg-${item.href}`}
                layoutId="activeNavBackground"
                className="absolute inset-y-2 w-[20%] bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-xl"
                style={{ left: `${index * 20}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            );
          }
          return null;
        })}
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center h-full w-full rounded-md transition-colors relative z-10',
                isActive 
                  ? 'text-[var(--primary)] dark:text-[var(--primary-light)]' 
                  : 'text-gray-500 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary-light)]'
              )}
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -inset-1 rounded-full bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              <motion.span 
                className="text-xs mt-1"
                animate={isActive ? { fontWeight: 600 } : { fontWeight: 400 }}
              >
                {item.label}
              </motion.span>
              {isActive && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--primary)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
} 