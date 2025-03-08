import { locations } from '@/lib/mock-data';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import SmoothLink from '@/components/navigation/SmoothLink';

export async function generateStaticParams() {
  return locations.map((location) => ({
    id: location.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const location = locations.find((loc) => loc.id === params.id);
  return {
    title: location ? `${location.name} | Ex-plore Maroc` : 'Location Not Found | Ex-plore Maroc',
    description: location?.description || 'Location not found',
  };
}

export default async function LocationPage({ params }: { params: { id: string } }) {
  const location = locations.find((loc) => loc.id === params.id);

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{location.name}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">{location.shortDescription}</p>
          <div className="flex items-center mt-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(location.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-white">{location.rating} ({location.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{location.description}</p>
              
              <h2 className="text-2xl font-bold mb-4">Historical Information</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{location.historicalInfo}</p>

              {/* Photo Gallery */}
              <h2 className="text-2xl font-bold mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={location.image}
                    alt={`${location.name} 1`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src="/images/marrakech.jpg"
                    alt={`${location.name} 2`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src="/images/bahia.jpg"
                    alt={`${location.name} 3`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/map-background.svg"
                  alt="Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-medium">Interactive map is not available in static export mode.</p>
                    <p className="text-sm text-gray-600 mt-2">Coordinates: {location.coordinates.latitude}, {location.coordinates.longitude}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span> {location.address}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul className="space-y-2 mb-6">
                {location.openingHours.days.map((day) => (
                  <li key={day.name} className="flex justify-between">
                    <span className="font-medium">{day.name}</span>
                    <span className="text-gray-600">{day.hours}</span>
                  </li>
                ))}
              </ul>
              {location.openingHours.notes && (
                <p className="text-sm text-gray-500 mb-6">{location.openingHours.notes}</p>
              )}

              {location.price && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Price</h3>
                  <p className="text-2xl font-bold text-teal-600">{location.price} {location.currency}</p>
                </div>
              )}

              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-gray-600">{location.category}</p>
                </div>
                <div>
                  <p className="font-medium">Best Time to Visit</p>
                  <p className="text-gray-600">{location.bestTimeToVisit}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {location.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Locations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations
              .filter(loc => loc.id !== location.id)
              .slice(0, 3)
              .map(relatedLocation => (
                <SmoothLink 
                  key={relatedLocation.id} 
                  href={`/location/${relatedLocation.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48">
                      <Image
                        src={relatedLocation.image}
                        alt={relatedLocation.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{relatedLocation.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedLocation.shortDescription}</p>
                    </div>
                  </div>
                </SmoothLink>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
} 