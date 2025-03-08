'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiX, FiCamera, FiMapPin, FiStar, FiCompass, FiSun, FiMoon } from 'react-icons/fi';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  condition: () => boolean;
  points: number;
  unlocked: boolean;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  
  // Initialize achievements
  useEffect(() => {
    const recognitionCount = parseInt(localStorage.getItem('recognitionCount') || '0', 10);
    const visitedLocations = JSON.parse(localStorage.getItem('visitedLocations') || '[]');
    const darkMode = localStorage.getItem('theme') === 'dark';
    
    const achievementsList: Achievement[] = [
      {
        id: 'first_scan',
        title: 'First Discovery',
        description: 'Scan your first Moroccan landmark',
        icon: <FiCamera className="w-5 h-5" />,
        condition: () => recognitionCount >= 1,
        points: 10,
        unlocked: recognitionCount >= 1
      },
      {
        id: 'five_scans',
        title: 'Curious Explorer',
        description: 'Scan 5 different landmarks',
        icon: <FiCompass className="w-5 h-5" />,
        condition: () => recognitionCount >= 5,
        points: 25,
        unlocked: recognitionCount >= 5
      },
      {
        id: 'ten_scans',
        title: 'Morocco Expert',
        description: 'Scan 10 different landmarks',
        icon: <FiStar className="w-5 h-5" />,
        condition: () => recognitionCount >= 10,
        points: 50,
        unlocked: recognitionCount >= 10
      },
      {
        id: 'visit_marrakech',
        title: 'Marrakech Explorer',
        description: 'Visit a landmark in Marrakech',
        icon: <FiMapPin className="w-5 h-5" />,
        condition: () => visitedLocations.includes('jemaa-el-fna') || visitedLocations.includes('bahia-palace'),
        points: 15,
        unlocked: visitedLocations.includes('jemaa-el-fna') || visitedLocations.includes('bahia-palace')
      },
      {
        id: 'visit_rabat',
        title: 'Rabat Explorer',
        description: 'Visit a landmark in Rabat',
        icon: <FiMapPin className="w-5 h-5" />,
        condition: () => visitedLocations.includes('hassan-tower'),
        points: 15,
        unlocked: visitedLocations.includes('hassan-tower')
      },
      {
        id: 'night_mode',
        title: 'Night Owl',
        description: 'Switch to dark mode',
        icon: darkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />,
        condition: () => darkMode,
        points: 5,
        unlocked: darkMode
      }
    ];
    
    setAchievements(achievementsList);
    
    // Calculate total points
    const points = achievementsList.reduce((total, achievement) => {
      return total + (achievement.unlocked ? achievement.points : 0);
    }, 0);
    
    setTotalPoints(points);
    
    // Load unlocked state from localStorage
    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    if (unlockedAchievements.length > 0) {
      setAchievements(prev => 
        prev.map(achievement => ({
          ...achievement,
          unlocked: unlockedAchievements.includes(achievement.id) || achievement.unlocked
        }))
      );
    }
  }, []);
  
  // Check for newly unlocked achievements
  useEffect(() => {
    const checkAchievements = () => {
      let newlyUnlocked = false;
      let lastUnlocked: Achievement | null = null;
      
      const updatedAchievements = achievements.map(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
          newlyUnlocked = true;
          lastUnlocked = achievement;
          
          // Update total points
          setTotalPoints(prev => prev + achievement.points);
          
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      
      if (newlyUnlocked) {
        setAchievements(updatedAchievements);
        
        // Save unlocked achievements to localStorage
        const unlockedIds = updatedAchievements
          .filter(a => a.unlocked)
          .map(a => a.id);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedIds));
        
        // Show achievement notification
        if (lastUnlocked) {
          setShowAchievement(lastUnlocked);
          setTimeout(() => setShowAchievement(null), 5000);
        }
      }
    };
    
    // Check on mount and when achievements change
    checkAchievements();
    
    // Set up interval to check periodically
    const interval = setInterval(checkAchievements, 5000);
    return () => clearInterval(interval);
  }, [achievements]);
  
  return { achievements, showAchievement, totalPoints, setShowAchievement };
}

export function AchievementNotification({ achievement, onClose }: { achievement: Achievement, onClose: () => void }) {
  return (
    <motion.div
      className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 max-w-xs w-full pointer-events-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
        >
          <FiX className="w-4 h-4" />
        </button>
        
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary-light)]/10 flex items-center justify-center text-[var(--primary)]">
            <FiAward className="w-6 h-6" />
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
            <p className="text-xs text-gray-500">+{achievement.points} points</p>
          </div>
        </div>
        
        <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
            {achievement.icon}
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-sm">{achievement.title}</h4>
            <p className="text-xs text-gray-500">{achievement.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementsPanel({ achievements, totalPoints, onClose }: { 
  achievements: Achievement[], 
  totalPoints: number,
  onClose: () => void 
}) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl max-h-[80vh] overflow-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FiAward className="w-6 h-6 text-[var(--primary)] mr-2" />
            <h2 className="text-xl font-bold">Achievements</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-[var(--primary-light)]/10 p-3 rounded-lg mb-4 flex items-center justify-between">
          <span className="font-medium">Total Points</span>
          <span className="text-lg font-bold text-[var(--primary)]">{totalPoints}</span>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-3 rounded-lg border ${
                achievement.unlocked 
                  ? 'border-[var(--primary-light)] bg-[var(--primary-light)]/5' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
              }`}
              whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.unlocked 
                    ? 'bg-[var(--primary)] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {achievement.icon}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <span className={`text-sm ${
                      achievement.unlocked 
                        ? 'text-[var(--primary)]' 
                        : 'text-gray-400'
                    }`}>
                      {achievement.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{achievement.description}</p>
                </div>
              </div>
              {achievement.unlocked && (
                <div className="mt-2 text-right">
                  <span className="inline-flex items-center text-xs text-[var(--success)]">
                    <FiAward className="w-3 h-3 mr-1" />
                    Unlocked
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 