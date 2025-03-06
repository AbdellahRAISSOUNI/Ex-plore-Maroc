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
    description: 'Jemaa el-Fna is a famous square and market place in Marrakesh\'s medina quarter. The square is part of the UNESCO World Heritage site and hosts various activities and food stalls, especially in the evening.',
    shortDescription: 'Famous square and market place in Marrakesh',
    image: '/images/locations/jemaa-el-fna.svg',
    coordinates: {
      latitude: 31.6258,
      longitude: -7.9891
    },
    category: 'attraction',
    tags: ['market', 'square', 'food', 'entertainment'],
    rating: 4.7,
    reviews: 12453,
    historicalInfo: 'Jemaa el-Fna has been a central gathering place in Marrakesh since the city\'s foundation in the 11th century. The square\'s name means "assembly of the dead" in Arabic, possibly referring to public executions that took place there in the past. Today, it\'s known for its vibrant atmosphere with storytellers, musicians, snake charmers, and food vendors.',
    openingHours: {
      open: '00:00',
      close: '24:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  {
    id: 'hassan-tower',
    name: 'Hassan Tower',
    description: 'Hassan Tower is the minaret of an incomplete mosque in Rabat. The tower was intended to be the largest minaret in the world along with the mosque, but construction stopped after Sultan Yacoub al-Mansour died in 1199.',
    shortDescription: 'Historic minaret of an incomplete mosque in Rabat',
    image: '/images/locations/hassan-tower.svg',
    coordinates: {
      latitude: 34.0253,
      longitude: -6.8261
    },
    category: 'monument',
    tags: ['history', 'architecture', 'minaret', 'mosque'],
    rating: 4.5,
    reviews: 8765,
    historicalInfo: 'Hassan Tower was commissioned by Abu Yusuf Yaqub al-Mansur, the third Caliph of the Almohad Caliphate, in 1195. The tower was designed to be 86 meters tall, but only reached 44 meters when construction halted after al-Mansur\'s death. The tower, made of red sandstone, is decorated with intricate geometric patterns typical of Islamic architecture of the period.',
    openingHours: {
      open: '09:00',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    price: 70,
    currency: 'MAD'
  },
  {
    id: 'bahia-palace',
    name: 'Bahia Palace',
    description: 'Bahia Palace is a late 19th-century palace in Marrakesh. The palace was built for Si Moussa, grand vizier of the sultan, and later expanded by his son Bou Ahmed. The name means "brilliance" in Arabic.',
    shortDescription: 'Grand 19th-century palace in Marrakesh',
    image: '/images/locations/bahia-palace.svg',
    coordinates: {
      latitude: 31.6218,
      longitude: -7.9836
    },
    category: 'monument',
    tags: ['palace', 'architecture', 'history', 'garden'],
    rating: 4.6,
    reviews: 9876,
    historicalInfo: 'Bahia Palace was built in the late 19th century by Si Moussa, grand vizier of Sultan Hassan I, and later expanded by his son Bou Ahmed. The palace showcases Moroccan and Islamic architectural styles with intricate woodwork, zellige tilework, and painted ceilings. It has 150 rooms, including a harem section, courtyards, and gardens designed to capture the essence of Islamic and Moroccan style.',
    openingHours: {
      open: '09:00',
      close: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    price: 70,
    currency: 'MAD'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'hotels',
    name: 'Hotels',
    icon: 'hotel',
    description: 'Find accommodations ranging from luxury resorts to traditional riads',
    count: 156
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: 'restaurant',
    description: 'Discover authentic Moroccan cuisine and international dining options',
    count: 243
  },
  {
    id: 'attractions',
    name: 'Attractions',
    icon: 'attraction',
    description: 'Explore historical sites, museums, and natural wonders',
    count: 87
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'transport',
    description: 'Find transportation options to get around Morocco',
    count: 42
  }
];

export const mockHotels: Hotel[] = [
  {
    id: 'royal-mansour',
    name: 'Royal Mansour Marrakech',
    description: 'Luxury hotel featuring private riads, a spa, and fine dining restaurants in the heart of Marrakech.',
    image: '/images/hotels/royal-mansour.svg',
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