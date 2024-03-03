import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import NextLink from 'next/link';
import { getCollections, getCollectionBySlug, getProductsByCollectionSlug } from '@/api/products';
import { Products } from '@/components/Products';
import { Header, Section } from '@/ui/organisms';
import { LinksWithActive } from '@/components/LinksWithActive';

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
				<LinksWithActive
					links={collections.map((collection) => ({
						as: NextLink,
						children: collection.name,
						href: `/collections/${collection.slug}`,
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
				<Products data-testid="products-list" products={products} />
			</Section>
		</>
	);
}
