export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  nationality: string;
  avatar?: string;
  isLoggedIn?: boolean;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  nationality?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  historicalInfo: string;
  openingHours?: {
    open: string;
    close: string;
    days: string[];
  };
  price?: number;
  currency?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  address: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  priceRange: string;
  cuisine: string[];
  address: string;
  openingHours: {
    open: string;
    close: string;
    days: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Transport {
  id: string;
  type: 'taxi' | 'bus' | 'train' | 'rental';
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  route?: string;
  schedule?: {
    departure: string;
    arrival: string;
    days: string[];
  };
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  address: string;
  openingHours: {
    open: string;
    close: string;
    days: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  historicalInfo: string;
}

export type Currency = 'MAD' | 'EUR' | 'USD' | 'JPY';

export interface RecognitionResult {
  locationId: string;
  confidence: number;
  timestamp: string;
} 