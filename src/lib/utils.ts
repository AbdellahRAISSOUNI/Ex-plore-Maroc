import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price with currency
 */
export function formatPrice(price: number, currency: string = 'MAD') {
  const currencySymbols: Record<string, string> = {
    MAD: 'DH',
    EUR: '€',
    USD: '$',
    JPY: '¥',
  };

  const symbol = currencySymbols[currency] || currency;
  
  return `${price.toFixed(2)} ${symbol}`;
}

/**
 * Converts a price from MAD to another currency
 */
export function convertCurrency(price: number, from: string = 'MAD', to: string = 'EUR') {
  // Mock exchange rates (as of May 2023)
  const exchangeRates: Record<string, number> = {
    MAD_EUR: 0.091,
    MAD_USD: 0.099,
    MAD_JPY: 13.65,
    EUR_MAD: 10.99,
    USD_MAD: 10.10,
    JPY_MAD: 0.073,
  };

  if (from === to) return price;

  const rate = exchangeRates[`${from}_${to}`];
  if (!rate) return price; // Return original if conversion not available

  return price * rate;
}

/**
 * Delays execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Checks if the device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Checks if the app is running in standalone mode (PWA installed)
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || 
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
} 