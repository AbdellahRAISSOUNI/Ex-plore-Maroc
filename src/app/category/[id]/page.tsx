import { categories, locations, hotels, restaurants } from '@/lib/mock-data';
import { Category } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.id === params.id);
  
  if (!category) {
    return <div>Category not found</div>;
  }

  const getItemsByCategory = (category: Category) => {
    switch (category.type) {
      case 'location':
        return locations.filter((location) => location.category === category.id);
      case 'hotel':
        return hotels.filter((hotel) => hotel.category === category.id);
      case 'restaurant':
        return restaurants.filter((restaurant) => restaurant.category === category.id);
      default:
        return [];
    }
  };

  const items = getItemsByCategory(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${category.type}/${item.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 line-clamp-2">{item.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = categories.find((c) => c.id === params.id);
  return {
    title: category ? `${category.name} | Ex-plore Maroc` : 'Category Not Found | Ex-plore Maroc',
    description: category?.description || 'Category not found',
  };
} 