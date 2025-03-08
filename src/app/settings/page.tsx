'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiUser, 
  FiGlobe, 
  FiMoon, 
  FiSun, 
  FiDollarSign, 
  FiVolume2, 
  FiBell, 
  FiLock, 
  FiHelpCircle, 
  FiInfo, 
  FiLogOut,
  FiChevronRight
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/lib/auth-context';

export default function SettingsPage() {
  const router = useRouter();
  const { authState, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
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
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      {/* Settings Content */}
      <motion.div
        className="p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Account Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiUser className="mr-2" />
            Account
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <Link href="/profile" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-white">
                    {authState.user.firstName.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{authState.user.firstName} {authState.user.lastName}</p>
                    <p className="text-xs text-gray-500">{authState.user.email}</p>
                  </div>
                </div>
                <FiChevronRight className="text-gray-400" />
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <Link href="/profile/edit" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Edit Profile</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </motion.section>

        {/* Preferences Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiGlobe className="mr-2" />
            Preferences
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <FiMoon className="mr-3 text-gray-500" />
                  <span>Dark Mode</span>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <FiDollarSign className="mr-3 text-gray-500" />
                  <span>Currency</span>
                </div>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border-none rounded-md px-2 py-1 text-sm"
                >
                  <option value="MAD">MAD (Moroccan Dirham)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <FiGlobe className="mr-3 text-gray-500" />
                  <span>Language</span>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border-none rounded-md px-2 py-1 text-sm"
                >
                  <option value="English">English</option>
                  <option value="French">Français</option>
                  <option value="Arabic">العربية</option>
                  <option value="Spanish">Español</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Notifications Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiBell className="mr-2" />
            Notifications
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <FiBell className="mr-3 text-gray-500" />
                  <span>Push Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 dark:peer-focus:ring-[var(--primary)]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <Link href="/notifications" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Notification Settings</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </motion.section>

        {/* Security Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiLock className="mr-2" />
            Security
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <Link href="/settings/change-password" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Change Password</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <Link href="/settings/privacy" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Privacy Settings</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </motion.section>

        {/* Support Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiHelpCircle className="mr-2" />
            Support
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <Link href="/help" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Help Center</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <Link href="/contact" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>Contact Us</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
              
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
              <Link href="/about" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span>About Explore Maroc</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </motion.section>

        {/* Logout Button */}
        <motion.div variants={itemVariants} className="pt-4">
          <Button 
            onClick={handleLogout}
            className="w-full py-6 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            <FiLogOut className="mr-2" />
            Logout
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center text-xs text-gray-500 pt-4">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2023 Explore Maroc. All rights reserved.</p>
        </motion.div>
      </motion.div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
} 