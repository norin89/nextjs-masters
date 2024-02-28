import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCollections, getCollectionBySlug, getProductsByCollectionSlug } from '@/api/products';
import { Header, ProductsList } from '@/ui/organisms';

export async function generateMetadata({
	params,
}: {
	params: { collectionSlug: string };
}): Promise<Metadata> {
	const collection = await getCollectionBySlug(params.collectionSlug);

	if (!collection) return {};

	return {
		title: `${collection.name} | Collections`,
		description: collection.description,
	};
}

export async function generateStaticParams() {
	const collections = await getCollections();

	return collections.map((collection) => ({
		collectionSlug: collection.slug,
	}));
}

export default async function CollectionPage({ params }: { params: { collectionSlug: string } }) {
	const collection = await getCollectionBySlug(params.collectionSlug);
	const products = await getProductsByCollectionSlug(params.collectionSlug);

	if (!collection || !products.length) {
		return notFound();
	}

	return (
		<>
			<Header suffix="Collections" title={collection.name} lead={collection.description} />
			<ProductsList data-testid="products-list" products={products} />
		</>
	);
}
