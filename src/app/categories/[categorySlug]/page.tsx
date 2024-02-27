import { redirect } from 'next/navigation';

import { getCategories } from '@/api/products';

export async function generateStaticParams() {
	const categories = await getCategories();

	return categories.map((category) => ({
		categorySlug: category.slug,
	}));
}

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
	redirect(`/categories/${params.categorySlug}/1`);
	return null;
}
