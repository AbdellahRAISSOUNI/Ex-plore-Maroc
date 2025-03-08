'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiFlag, FiLogOut, FiSettings, FiHelpCircle, FiInfo, FiAward, FiCamera, FiMapPin } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAchievements, AchievementNotification, AchievementsPanel } from '@/components/achievements';

export default function ProfilePage() {
  const router = useRouter();
  const { authState, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAchievementsPanel, setShowAchievementsPanel] = useState(false);
  const { achievements, showAchievement, totalPoints, setShowAchievement } = useAchievements();
  
  // Calculate user level based on points
  const userLevel = Math.max(1, Math.floor(totalPoints / 20) + 1);
  const nextLevelPoints = userLevel * 20;
  const progressToNextLevel = (totalPoints % 20) / 20 * 100;
  
  // Get unlocked achievements count
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  
  // Get recent activity
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string;
    type: 'scan' | 'visit' | 'achievement';
    title: string;
    timestamp: string;
    icon: React.ReactNode;
  }>>([]);

  useEffect(() => {
    // Check if user is logged in
    if (!authState.isLoading && !authState.isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoaded(true);
      
      // Generate some mock recent activity
      const recognitionCount = parseInt(localStorage.getItem('recognitionCount') || '0', 10);
      const visitedLocations = JSON.parse(localStorage.getItem('visitedLocations') || '[]');
      
      const mockActivity = [
        {
          id: '1',
          type: 'achievement' as const,
          title: 'Unlocked "First Discovery" achievement',
          timestamp: '2 hours ago',
          icon: <FiAward className="w-4 h-4" />
        },
        {
          id: '2',
          type: 'scan' as const,
          title: 'Scanned Jemaa el-Fna',
          timestamp: '1 day ago',
          icon: <FiCamera className="w-4 h-4" />
        },
        {
          id: '3',
          type: 'visit' as const,
          title: 'Visited Hassan Tower',
          timestamp: '3 days ago',
          icon: <FiMapPin className="w-4 h-4" />
        }
      ];
      
      setRecentActivity(mockActivity);
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
      {/* Achievement notification */}
      <AnimatePresence>
        {showAchievement && (
          <AchievementNotification 
            achievement={showAchievement} 
            onClose={() => setShowAchievement(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Achievements panel */}
      <AnimatePresence>
        {showAchievementsPanel && (
          <AchievementsPanel 
            achievements={achievements} 
            totalPoints={totalPoints} 
            onClose={() => setShowAchievementsPanel(false)} 
          />
        )}
      </AnimatePresence>
      
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--primary-light)]">
            {authState.user.avatar ? (
              <Image
                src={authState.user.avatar}
                alt={`${authState.user.firstName} ${authState.user.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <FiUser className="w-10 h-10" />
                </div>
              )}
              
              {/* Level badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800">
                {userLevel}
              </div>
          </div>
            
            <div className="ml-4 flex-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {authState.user.firstName} {authState.user.lastName}
          </h2>
          <p className="text-[var(--primary)] dark:text-[var(--primary-light)] font-medium">
                Level {userLevel} Explorer
              </p>
              
              {/* Progress to next level */}
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">{totalPoints} points</span>
                  <span className="text-gray-500">Next level: {nextLevelPoints}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Achievements summary */}
          <div 
            className="mt-6 p-3 bg-[var(--primary-light)]/10 rounded-lg flex items-center justify-between cursor-pointer"
            onClick={() => setShowAchievementsPanel(true)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                <FiAward className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Achievements</h3>
                <p className="text-xs text-gray-500">
                  {unlockedAchievements} of {totalAchievements} unlocked
                </p>
              </div>
            </div>
            <div className="text-lg font-bold text-[var(--primary)]">
              {totalPoints}
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.length > 0 ? (
              recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center p-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'achievement' 
                      ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500' 
                      : activity.type === 'scan'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500'
                        : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500'
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-800 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No recent activity
              </div>
            )}
          </div>
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
            <button 
              className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => router.push('/settings')}
            >
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