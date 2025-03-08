import { hotels } from '@/lib/mock-data';
import Image from 'next/image';
import { Metadata } from 'next';

export default async function HotelPage({
  params,
}: {
  params: { id: string }
}) {
  const hotel = hotels.find((h) => h.id === params.id);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-lg opacity-90">{hotel.shortDescription}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-6">{hotel.description}</p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Hotel Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{hotel.address}</p>
                </div>
                <div>
                  <p className="font-medium">Price</p>
                  <p className="text-gray-600">{hotel.price} {hotel.currency} per night</p>
                </div>
                <div>
                  <p className="font-medium">Rating</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{hotel.rating}</span>
                    <span className="text-gray-400 ml-2">({hotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{hotel.phone}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{hotel.email}</p>
                </div>
                <div>
                  <p className="font-medium">Website</p>
                  <a
                    href={hotel.website}
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
  return hotels.map((hotel) => ({
    id: hotel.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const hotel = hotels.find((h) => h.id === params.id);
  return {
    title: hotel ? `${hotel.name} | Ex-plore Maroc` : 'Hotel Not Found | Ex-plore Maroc',
    description: hotel?.description || 'Hotel not found',
  };
} 