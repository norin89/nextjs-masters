'use server';

import { revalidateTag } from 'next/cache';

import { addReview } from '@/api/reviews';

export async function addReviewAction(formData: FormData) {
	// TODO: Typescript doesn't support typed `FormData` yet - https://github.com/microsoft/TypeScript/issues/43797
	const productId = formData.get('productId') as string;

	const data = {
		productId,
		rating: parseInt(formData.get('rating') as string),
		title: formData.get('headline') as string,
		description: formData.get('content') as string,
		author: formData.get('name') as string,
		email: formData.get('email') as string,
	};

	await addReview(data);

	revalidateTag('reviews');
}
