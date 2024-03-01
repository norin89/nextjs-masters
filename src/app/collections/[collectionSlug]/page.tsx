import type { Metadata, Route } from 'next';
import { notFound } from 'next/navigation';

import { getCollections, getCollectionBySlug, getProductsByCollectionSlug } from '@/api/products';
import { Header, ProductsList, Section } from '@/ui/organisms';
import { Links } from '@/ui/molecules';

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
	const collections = await getCollections();
	const collection = await getCollectionBySlug(params.collectionSlug);
	const products = await getProductsByCollectionSlug(params.collectionSlug);

	if (!collection || !products.length) {
		return notFound();
	}

	return (
		<>
			<Section isTight>
				<Links
					links={collections.map((collection) => ({
						children: collection.name,
						href: `/collections/${collection.slug}` as Route,
					}))}
				/>
			</Section>
			<Section>
				<Header
					level={1}
					suffix="Collections"
					title={collection.name}
					lead={collection.description}
				/>
				<ProductsList data-testid="products-list" products={products} />
			</Section>
		</>
	);
}
