'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUser, FiMail, FiPhone, FiFlag, FiLogOut, FiSettings, FiHelpCircle, FiInfo } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function ProfilePage() {
  const router = useRouter();
  const { authState, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!authState.isLoading && !authState.isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoaded(true);
    }
  }, [authState.isLoading, authState.isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isLoaded || !authState.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--primary)] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Profile content */}
      <div className="p-4 space-y-6">
        {/* User info card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-[var(--primary-light)]">
            {authState.user.avatar ? (
              <Image
                src={authState.user.avatar}
                alt={`${authState.user.firstName} ${authState.user.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                <FiUser className="w-12 h-12" />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {authState.user.firstName} {authState.user.lastName}
          </h2>
          <p className="text-[var(--primary)] dark:text-[var(--primary-light)] font-medium">
            Explorer
          </p>
        </div>

        {/* User details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Personal Information</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] bg-opacity-20 flex items-center justify-center text-[var(--primary)] dark:text-[var(--primary-light)]">
                <FiMail className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-800 dark:text-white">{authState.user.email}</p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] bg-opacity-20 flex items-center justify-center text-[var(--primary)] dark:text-[var(--primary-light)]">
                <FiPhone className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-800 dark:text-white">{authState.user.phone}</p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] bg-opacity-20 flex items-center justify-center text-[var(--primary)] dark:text-[var(--primary-light)]">
                <FiFlag className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Nationality</p>
                <p className="font-medium text-gray-800 dark:text-white">{authState.user.nationality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Settings</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <FiSettings className="w-5 h-5" />
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-800 dark:text-white">Account Settings</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your profile information</p>
              </div>
            </button>
            <button className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <FiHelpCircle className="w-5 h-5" />
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-800 dark:text-white">Help & Support</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get help with the app</p>
              </div>
            </button>
            <button className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <FiInfo className="w-5 h-5" />
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-800 dark:text-white">About</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">App information and version</p>
              </div>
            </button>
          </div>
        </div>

        {/* Logout button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:text-red-500 dark:hover:bg-red-900/20"
        >
          <FiLogOut className="mr-2" />
          Logout
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
} 