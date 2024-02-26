import { redirect } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { collectionSlug: string } }) {
	redirect(`/collections/${params.collectionSlug}/1`);
	return null;
}
