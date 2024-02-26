import { notFound, redirect } from 'next/navigation';

import { getCollections } from '@/api/products';

export default async function CategoryPage() {
	const collections = await getCollections();

	if (!collections[0]) {
		return notFound();
	}

	redirect(`/collections/${collections[0].slug}`);
	return null;
}
