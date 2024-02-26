import { notFound, redirect } from 'next/navigation';

import { getCategories } from '@/api/products';

export default async function CategoryPage() {
	const categories = await getCategories();

	if (!categories[0]) {
		return notFound();
	}

	redirect(`/categories/${categories[0].slug}`);
	return null;
}
