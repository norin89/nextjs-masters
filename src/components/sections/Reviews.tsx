'use client';

import { useOptimistic, useRef } from 'react';

import { type ProductFragment, type ReviewFragment } from '@/gql/graphql';
import { ProductReviews } from '@/components/ProductReviews';
import { Card } from '@/ui/molecules';
import { Button, Input, InputRating, Title } from '@/ui/atoms';
import { addReviewAction } from '@/actions/reviews';

export function Reviews({
	productId,
	reviews,
}: {
	productId: ProductFragment['id'];
	reviews: ReviewFragment[];
}) {
	const formRef = useRef<HTMLFormElement>(null);

	const [optimisticReviews, addOptimisticReview] = useOptimistic(
		reviews,
		(state, newReview: ReviewFragment) => [
			{
				...newReview,
				isSending: true,
			},
			...state,
		],
	);

	const handleFormAction = async (formData: FormData) => {
		addOptimisticReview({
			id: '-1',
			author: formData.get('name') as string,
			email: formData.get('email') as string,
			description: formData.get('content') as string,
			rating: parseInt(formData.get('rating') as string),
			title: formData.get('headline') as string,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		formRef.current?.reset();

		await addReviewAction(formData);
	};

	return (
		<div className="align-center grid grid-flow-row-dense grid-cols-3 gap-4">
			{/* TODO: Calculate top */}
			<div className="col-span-3 lg:sticky lg:top-[90px] lg:col-span-1 lg:self-start">
				<Card className="mb-8">
					<div className="mb-4">
						<Title level={3}>Share your thoughts</Title>
						<p className="py-2">
							If you’ve used this product, share your thoughts with other customers
						</p>
					</div>
					<form action={handleFormAction} ref={formRef}>
						<input type="hidden" name="productId" value={productId} />
						<div className="mb-4">
							<InputRating name="rating" placeholder="Your rating:" isRequired />
						</div>
						<div className="mb-2">
							<Input name="headline" type="text" placeholder="Review title" isRequired />
						</div>
						<div className="mb-2">
							<Input name="content" type="textarea" placeholder="Content" isRequired />
						</div>
						<div className="mb-2">
							<Input name="name" type="text" placeholder="Your name" isRequired />
						</div>
						<div className="mb-2">
							<Input name="email" type="email" placeholder="Email" isRequired />
						</div>
						<Button variant="primary" type="submit" className="mt-4">
							Add your review
						</Button>
					</form>
				</Card>
			</div>
			<div className="col-span-3 lg:col-span-2 lg:p-4">
				{reviews.length > 0 ? (
					<ProductReviews reviews={optimisticReviews} />
				) : (
					<p>No reviews yet...</p>
				)}
			</div>
		</div>
	);
}
