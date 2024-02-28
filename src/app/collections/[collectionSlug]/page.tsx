import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCollections, getCollectionBySlug, getProductsByCollectionSlug } from '@/api/products';
import { ProductsList } from '@/ui/organisms';
import { Title } from '@/ui/atoms';

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
			<header className="mb-8 text-center md:mb-12 lg:mb-16 xl:mb-24">
				<Title level={1}>
					<span className="opacity-25">Collections / </span>
					{collection.name}
				</Title>
				{collection.description && <p className="mt-4">{collection.description}</p>}
			</header>
			<ProductsList data-testid="products-list" products={products} />
		</>
	);
}
