'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials } from '@/types';
import { generateId } from './utils';
import Cookies from 'js-cookie';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null
};

// Create context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}>({
  authState: initialState,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoggedIn: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        Cookies.remove('user');
      }
    }
  }, []);

  // Login function - for demo, accepts any email/password
  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, create a user with the provided email
      const user: User = {
        id: generateId(),
        firstName: 'Demo',
        lastName: 'User',
        email: credentials.email,
        phone: '+212 123456789',
        nationality: 'Morocco',
        avatar: '/images/avatar.jpg',
        isLoggedIn: true
      };
      
      // Save to cookie (expires in 7 days)
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      
      // Update state
      setAuthState({
        user,
        isLoggedIn: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Login error:', err);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.'
      }));
    }
  };

  // Signup function - for demo, accepts any details
  const signup = async (credentials: SignupCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a user with the provided details
      const user: User = {
        id: generateId(),
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        phone: credentials.phone || '+212 123456789',
        nationality: credentials.nationality || 'Morocco',
        avatar: '/images/avatar.jpg',
        isLoggedIn: true
      };
      
      // Save to cookie (expires in 7 days)
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      
      // Update state
      setAuthState({
        user,
        isLoggedIn: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Signup error:', err);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Signup failed. Please try again.'
      }));
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove('user');
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 