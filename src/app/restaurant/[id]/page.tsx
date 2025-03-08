import { restaurants } from '@/lib/mock-data';
import Image from 'next/image';
import { Metadata } from 'next';

export default async function RestaurantPage({
  params,
}: {
  params: { id: string }
}) {
  const restaurant = restaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90">{restaurant.shortDescription}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-6">{restaurant.description}</p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul className="space-y-2">
                {restaurant.openingHours.days.map((day) => (
                  <li key={day.name} className="flex justify-between">
                    <span className="font-medium">{day.name}</span>
                    <span className="text-gray-600">{day.hours}</span>
                  </li>
                ))}
              </ul>
              {restaurant.openingHours.notes && (
                <p className="mt-4 text-sm text-gray-500">{restaurant.openingHours.notes}</p>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Restaurant Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>
                <div>
                  <p className="font-medium">Cuisine</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisine.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Price Range</p>
                  <p className="text-gray-600">{restaurant.priceRange}</p>
                </div>
                <div>
                  <p className="font-medium">Rating</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{restaurant.rating}</span>
                    <span className="text-gray-400 ml-2">({restaurant.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{restaurant.phone}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{restaurant.email}</p>
                </div>
                <div>
                  <p className="font-medium">Website</p>
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const restaurant = restaurants.find((r) => r.id === params.id);
  return {
    title: restaurant ? `${restaurant.name} | Ex-plore Maroc` : 'Restaurant Not Found | Ex-plore Maroc',
    description: restaurant?.description || 'Restaurant not found',
  };
} 