import { mockRestaurants } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurants | Ex-plore Maroc',
  description: 'Discover the best Moroccan cuisine and dining experiences',
};

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/hasssan-tower.jpg"
          alt="Moroccan Restaurants"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurants</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience authentic Moroccan cuisine and flavors
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-64">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-bold text-teal-600">
                  {restaurant.priceRange}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(restaurant.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{restaurant.rating} ({restaurant.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{restaurant.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.cuisine.map((type) => (
                    <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 text-sm">
                    <span>Open: {restaurant.openingHours.open} - {restaurant.openingHours.close}</span>
                  </div>
                  <Link 
                    href={`/restaurant/${restaurant.id}`}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 