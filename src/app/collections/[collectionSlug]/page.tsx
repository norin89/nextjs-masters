import { redirect } from 'next/navigation';

import { getCollections } from '@/api/products';

export async function generateStaticParams() {
	const collections = await getCollections();

	return collections.map((collection) => ({
		collectionSlug: collection.slug,
	}));
}

export default function CollectionPage({ params }: { params: { collectionSlug: string } }) {
	redirect(`/collections/${params.collectionSlug}/1`);
	return null;
}
