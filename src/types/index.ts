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
  historicalInfo: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  bestTimeToVisit: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    open: string;
    close: string;
    days: Array<{
      name: string;
      hours: string;
    }>;
    notes?: string;
  };
  price?: number;
  currency?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  type: 'location' | 'hotel' | 'restaurant';
  icon: string;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  address: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  website: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  address: string;
  rating: number;
  reviews: number;
  priceRange: string;
  cuisine: string[];
  openingHours: {
    open: string;
    close: string;
    days: Array<{
      name: string;
      hours: string;
    }>;
    notes?: string;
  };
  phone: string;
  email: string;
  website: string;
  category: string;
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