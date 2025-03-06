import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 h-16 px-2">
      <div className="h-full max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center h-full w-full rounded-md transition-colors',
                isActive 
                  ? 'text-[var(--primary)] dark:text-[var(--primary-light)]' 
                  : 'text-gray-500 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary-light)]'
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 