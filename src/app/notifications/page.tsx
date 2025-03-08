'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBell, FiTrash2, FiSettings, FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobileNav } from '@/components/layout/mobile-nav';
import { useAuth } from '@/lib/auth-context';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'promo',
    title: 'Special Offer',
    message: 'Get 20% off on your next hotel booking in Marrakech!',
    time: '2 hours ago',
    read: false,
    image: '/images/hotels/royal-mansour.jpg'
  },
  {
    id: 2,
    type: 'info',
    title: 'New Attraction Added',
    message: 'Discover the new Majorelle Garden tour now available in the app.',
    time: '1 day ago',
    read: false,
    image: '/images/locations/bahia-palace.jpg'
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Upcoming Trip',
    message: 'Your trip to Fes is in 3 days. Check out our recommendations!',
    time: '2 days ago',
    read: true,
    image: '/images/locations/hassan-tower.jpg'
  },
  {
    id: 4,
    type: 'system',
    title: 'App Update Available',
    message: 'Update to the latest version for new features and improvements.',
    time: '1 week ago',
    read: true,
    image: null
  }
];

export default function NotificationsPage() {
  const router = useRouter();
  const { authState } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Check if user is logged in
    if (!authState.isLoading && !authState.isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoaded(true);
    }
  }, [authState.isLoading, authState.isLoggedIn, router]);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
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

  if (!isLoaded) {
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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={markAllAsRead}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              title="Mark all as read"
            >
              <FiCheck className="w-5 h-5" />
            </button>
            <Link href="/settings/notifications">
              <div 
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                title="Notification settings"
              >
                <FiSettings className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 pt-4 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'promo', label: 'Offers' },
            { id: 'info', label: 'Updates' },
            { id: 'reminder', label: 'Reminders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tab.label}
              {tab.id === 'unread' && notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <motion.div
        className="p-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {filteredNotifications.length > 0 ? (
          <>
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                className={`relative ${!notification.read ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[var(--primary)] before:rounded-l-lg' : ''}`}
              >
                <Card className={`overflow-hidden border-none shadow-lg ${!notification.read ? 'bg-[var(--primary)]/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex">
                      {notification.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                          <Image
                            src={notification.image}
                            alt={notification.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mr-3">
                          <FiBell className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!notification.read ? 'text-[var(--primary)]' : ''}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 space-x-2">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-[var(--primary)] hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredNotifications.length > 0 && (
              <motion.div variants={itemVariants} className="pt-4">
                <Button 
                  onClick={clearAllNotifications}
                  variant="outline"
                  className="w-full py-3 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <FiTrash2 className="mr-2" />
                  Clear All Notifications
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FiBell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No notifications</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {activeTab === 'all' 
                ? "You don't have any notifications yet." 
                : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications.`}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
} 