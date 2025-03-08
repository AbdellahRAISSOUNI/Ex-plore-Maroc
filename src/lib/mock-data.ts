import { 
  Location, 
  Category, 
  Hotel, 
  Restaurant, 
  Transport, 
  Attraction 
} from '@/types';

export const mockLocations: Location[] = [
  {
    id: 'jemaa-el-fna',
    name: 'Jemaa el-Fna',
    image: '/images/marrakech.jpg',
    category: 'Historical Site',
    rating: 4.8,
    reviews: 1250,
    description: 'A vibrant square and marketplace in Marrakech\'s medina quarter, known for its traditional activities and entertainment.',
    shortDescription: 'Famous square and marketplace in Marrakech',
    historicalInfo: 'Dating back to the founding of Marrakech by the Almoravids in 1070-1072, Jemaa el-Fna has been the heart of the city for nearly a millennium.',
    coordinates: { latitude: 31.6258, longitude: -7.9891 },
    openingHours: { open: '24/7', close: '24/7', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    tags: ['market', 'square', 'food', 'entertainment']
  },
  {
    id: 'hassan-tower',
    name: 'Hassan Tower',
    image: '/images/hassan-tower.jpg',
    category: 'Monument',
    rating: 4.6,
    reviews: 850,
    description: 'The Hassan Tower is the minaret of an incomplete mosque in Rabat, Morocco. It was commissioned by Abu Yusuf Yaqub al-Mansur.',
    shortDescription: 'Historic minaret in Rabat',
    historicalInfo: 'Construction began in 1195 AD. The tower was intended to be the largest minaret in the world, but construction stopped after Al-Mansur\'s death in 1199.',
    coordinates: { latitude: 34.0241, longitude: -6.8220 },
    openingHours: { open: '8:00', close: '18:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    price: 70,
    currency: 'MAD',
    tags: ['monument', 'mosque', 'history']
  },
  {
    id: 'bahia-palace',
    name: 'Bahia Palace',
    image: '/images/bahia.jpg',
    category: 'Palace',
    rating: 4.7,
    reviews: 950,
    description: 'A stunning example of Moroccan architecture, featuring intricate decorations and beautiful gardens.',
    shortDescription: 'Historic palace with beautiful gardens',
    historicalInfo: 'Built in the late 19th century, the palace was intended to be the greatest palace of its time, capturing the essence of Islamic and Moroccan architectural styles.',
    coordinates: { latitude: 31.6218, longitude: -7.9828 },
    openingHours: { open: '9:00', close: '17:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    price: 70,
    currency: 'MAD',
    tags: ['palace', 'architecture', 'garden']
  },
];

export const mockCategories: Category[] = [
  {
    id: 'attractions',
    name: 'Attractions',
    count: 15,
    icon: 'landmark',
    image: '/images/marrakech.jpg',
    description: 'Discover historical monuments and cultural landmarks'
  },
  {
    id: 'hotels',
    name: 'Hotels',
    count: 42,
    icon: 'hotel',
    image: '/images/hotels/hotel1.jpg',
    description: 'Find comfortable stays and luxury accommodations'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    count: 67,
    icon: 'restaurant',
    image: '/images/restaurants/restaurant1.jpg',
    description: 'Experience local and international cuisine'
  },
  {
    id: 'activities',
    name: 'Activities',
    count: 28,
    icon: 'activity',
    image: '/images/activities.jpg',
    description: 'Explore exciting things to do'
  }
];

export const mockHotels: Hotel[] = [
  {
    id: 'royal-mansour',
    name: 'Royal Mansour Marrakech',
    description: 'Luxury hotel featuring private riads, a spa, and fine dining restaurants in the heart of Marrakech.',
    image: '/images/hotels/royal-mansour.jpg',
    rating: 4.9,
    reviews: 876,
    price: 9500,
    currency: 'MAD',
    address: 'Rue Abou Abbas El Sebti, Marrakech 40000, Morocco',
    amenities: ['Spa', 'Pool', 'Restaurant', 'Free WiFi', 'Room Service', 'Air Conditioning', 'Concierge'],
    coordinates: {
      latitude: 31.6294,
      longitude: -8.0008
    }
  },
  {
    id: 'mamounia',
    name: 'La Mamounia',
    description: 'Historic luxury hotel with gardens, multiple restaurants, and a spa, located near Jemaa el-Fna.',
    image: '/images/hotels/mamounia.jpg',
    rating: 4.8,
    reviews: 1243,
    price: 5200,
    currency: 'MAD',
    address: 'Avenue Bab Jdid, Marrakech 40040, Morocco',
    amenities: ['Spa', 'Pool', 'Restaurant', 'Free WiFi', 'Room Service', 'Air Conditioning', 'Bar'],
    coordinates: {
      latitude: 31.6234,
      longitude: -7.9969
    }
  },
  {
    id: 'riad-kniza',
    name: 'Riad Kniza',
    description: 'Traditional riad with a courtyard pool, restaurant, and rooftop terrace in the Marrakech medina.',
    image: '/images/hotels/riad-kniza.jpg',
    rating: 4.7,
    reviews: 654,
    price: 2800,
    currency: 'MAD',
    address: '34 Derb l\'Hotel, Bab Doukala, Marrakech 40000, Morocco',
    amenities: ['Pool', 'Restaurant', 'Free WiFi', 'Room Service', 'Air Conditioning', 'Airport Shuttle'],
    coordinates: {
      latitude: 31.6336,
      longitude: -7.9933
    }
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 'nomad',
    name: 'Nomad',
    description: 'Modern Moroccan cuisine served on a rooftop terrace with views of the medina.',
    image: '/images/restaurants/nomad.jpg',
    rating: 4.6,
    reviews: 1876,
    priceRange: '$$',
    cuisine: ['Moroccan', 'Mediterranean', 'Fusion'],
    address: '1 Derb Aarjane, Rahba Lakdima, Marrakech 40000, Morocco',
    openingHours: {
      open: '12:00',
      close: '23:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6310,
      longitude: -7.9845
    }
  },
  {
    id: 'le-jardin',
    name: 'Le Jardin',
    description: 'Restaurant set in a garden courtyard serving Moroccan and international dishes.',
    image: '/images/restaurants/le-jardin.jpg',
    rating: 4.5,
    reviews: 1243,
    priceRange: '$$',
    cuisine: ['Moroccan', 'Mediterranean', 'Vegetarian'],
    address: '32 Souk Jeld Sidi Abdelaziz, Marrakech 40000, Morocco',
    openingHours: {
      open: '12:00',
      close: '23:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6305,
      longitude: -7.9839
    }
  },
  {
    id: 'dar-yacout',
    name: 'Dar Yacout',
    description: 'Traditional Moroccan dining experience in a palatial setting with rooftop views.',
    image: '/images/restaurants/dar-yacout.jpg',
    rating: 4.7,
    reviews: 987,
    priceRange: '$$$',
    cuisine: ['Moroccan', 'Traditional'],
    address: '79 Derb Sidi Ahmed Soussi, Bab Doukkala, Marrakech 40000, Morocco',
    openingHours: {
      open: '19:00',
      close: '23:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6342,
      longitude: -7.9929
    }
  }
];

export const mockTransports: Transport[] = [
  {
    id: 'petit-taxi',
    type: 'taxi',
    name: 'Petit Taxi',
    description: 'Small taxis that operate within city limits. They are metered and can carry up to 3 passengers.',
    image: '/images/transport/petit-taxi.jpg',
    price: 20,
    currency: 'MAD'
  },
  {
    id: 'grand-taxi',
    type: 'taxi',
    name: 'Grand Taxi',
    description: 'Larger taxis that operate between cities and can carry up to 6 passengers. Fixed prices for routes.',
    image: '/images/transport/grand-taxi.jpg',
    price: 50,
    currency: 'MAD'
  },
  {
    id: 'ctm-bus',
    type: 'bus',
    name: 'CTM Bus',
    description: 'Comfortable intercity buses with air conditioning and scheduled departures.',
    image: '/images/transport/ctm-bus.jpg',
    price: 120,
    currency: 'MAD',
    route: 'Marrakech to Casablanca',
    schedule: {
      departure: '08:00',
      arrival: '12:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  }
];

export const mockAttractions: Attraction[] = [
  {
    id: 'majorelle-garden',
    name: 'Majorelle Garden',
    description: 'Botanical garden and artist\'s landscape garden featuring a Cubist villa, cacti, and the Berber Museum.',
    image: '/images/attractions/majorelle-garden.jpg',
    rating: 4.7,
    reviews: 9876,
    price: 70,
    currency: 'MAD',
    address: 'Rue Yves Saint Laurent, Marrakech 40090, Morocco',
    openingHours: {
      open: '08:00',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6417,
      longitude: -8.0035
    },
    historicalInfo: 'Majorelle Garden was created by French painter Jacques Majorelle over almost 40 years, starting in 1923. The garden contains exotic plants from five continents and features a striking blue villa (Majorelle Blue). In 1980, it was purchased and restored by fashion designers Yves Saint Laurent and Pierre Bergé.'
  },
  {
    id: 'koutoubia-mosque',
    name: 'Koutoubia Mosque',
    description: 'The largest mosque in Marrakech, known for its impressive minaret that dominates the city skyline.',
    image: '/images/attractions/koutoubia-mosque.jpg',
    rating: 4.6,
    reviews: 7654,
    price: 0,
    currency: 'MAD',
    address: 'Avenue Mohammed V, Marrakech 40000, Morocco',
    openingHours: {
      open: '08:30',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6242,
      longitude: -7.9941
    },
    historicalInfo: 'Koutoubia Mosque was completed in the late 12th century under the reign of the Almohad Caliph Yaqub al-Mansur. The minaret, 77 meters tall, served as a model for the Giralda in Seville and the Hassan Tower in Rabat. The mosque\'s name comes from the Arabic word "kutubiyyin" (booksellers), as the area once hosted many manuscript dealers.'
  },
  {
    id: 'saadian-tombs',
    name: 'Saadian Tombs',
    description: 'Royal necropolis from the Saadian dynasty featuring ornate mausoleums and decorative tilework.',
    image: '/images/attractions/saadian-tombs.jpg',
    rating: 4.5,
    reviews: 5432,
    price: 70,
    currency: 'MAD',
    address: 'Rue de la Kasbah, Marrakech 40000, Morocco',
    openingHours: {
      open: '09:00',
      close: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    coordinates: {
      latitude: 31.6196,
      longitude: -7.9908
    },
    historicalInfo: 'The Saadian Tombs date back to the time of Sultan Ahmad al-Mansur (1578-1603) of the Saadian dynasty. The tombs were sealed up and forgotten until 1917 when they were rediscovered during a French aerial survey. The site contains about 60 members of the Saadian dynasty, including al-Mansur, his family, and trusted advisers.'
  }
];

export const categories: Category[] = [
  {
    id: 'attractions',
    name: 'Attractions',
    description: 'Discover the most iconic attractions in Morocco',
    type: 'location',
    icon: '/icons/attractions.svg',
    image: '/images/categories/attractions.jpg'
  },
  {
    id: 'hotels',
    name: 'Hotels',
    description: 'Find the perfect place to stay',
    type: 'hotel',
    icon: '/icons/hotels.svg',
    image: '/images/categories/hotels.jpg'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    description: 'Experience authentic Moroccan cuisine',
    type: 'restaurant',
    icon: '/icons/restaurants.svg',
    image: '/images/categories/restaurants.jpg'
  },
  {
    id: 'activities',
    name: 'Activities',
    description: 'Explore exciting activities and experiences',
    type: 'location',
    icon: '/icons/activities.svg',
    image: '/images/categories/activities.jpg'
  }
];

export const locations: Location[] = [
  // ... existing locations array ...
];

export const hotels: Hotel[] = [
  // ... existing hotels array ...
];

export const restaurants: Restaurant[] = [
  // ... existing restaurants array ...
]; 