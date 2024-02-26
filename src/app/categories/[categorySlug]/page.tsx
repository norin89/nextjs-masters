import { redirect } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
	redirect(`/categories/${params.categorySlug}/1`);
	return null;
}
