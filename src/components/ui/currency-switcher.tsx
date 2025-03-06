import React, { useState } from 'react';
import { Currency } from '@/types';
import { cn } from '@/lib/utils';

interface CurrencySwitcherProps {
  onCurrencyChange: (currency: Currency) => void;
  currentCurrency: Currency;
  className?: string;
}

export function CurrencySwitcher({ 
  onCurrencyChange, 
  currentCurrency = 'MAD',
  className 
}: CurrencySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currencies: { value: Currency; label: string; symbol: string }[] = [
    { value: 'MAD', label: 'Moroccan Dirham', symbol: 'DH' },
    { value: 'EUR', label: 'Euro', symbol: '€' },
    { value: 'USD', label: 'US Dollar', symbol: '$' },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥' }
  ];
  
  const currentCurrencyData = currencies.find(c => c.value === currentCurrency) || currencies[0];
  
  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{currentCurrencyData.symbol}</span>
        <span className="text-sm">{currentCurrencyData.value}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {currencies.map((currency) => (
              <button
                key={currency.value}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  currency.value === currentCurrency ? 'bg-gray-100 dark:bg-gray-700' : ''
                )}
                role="menuitem"
                onClick={() => {
                  onCurrencyChange(currency.value);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{currency.label}</span>
                  <span className="font-medium">{currency.symbol}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 