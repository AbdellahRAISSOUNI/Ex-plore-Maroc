import { locations } from '@/lib/mock-data';
import Image from 'next/image';
import { Metadata } from 'next';

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
    <div className="min-h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{location.name}</h1>
          <p className="text-lg opacity-90">{location.shortDescription}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-6">{location.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Historical Information</h2>
            <p className="text-gray-600 mb-6">{location.historicalInfo}</p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul className="space-y-2">
                {location.openingHours.days.map((day) => (
                  <li key={day.name} className="flex justify-between">
                    <span className="font-medium">{day.name}</span>
                    <span className="text-gray-600">{day.hours}</span>
                  </li>
                ))}
              </ul>
              {location.openingHours.notes && (
                <p className="mt-4 text-sm text-gray-500">{location.openingHours.notes}</p>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Location Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{location.address}</p>
                </div>
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
      </div>
    </div>
  );
} 