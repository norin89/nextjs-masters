'use client';

import { useState } from 'react';

import { type ReviewFragment } from '@/gql/graphql';
import { DEFAULT_VISIBLE_REVIEWS } from '@/config';
import { Review, type ReviewProps } from '@/ui/molecules';
import { ReviewsList } from '@/ui/organisms';
import { Button } from '@/ui/atoms';

export const ProductReviews = ({
	reviews = [],
}: {
	reviews: (ReviewFragment & { isSending?: boolean })[];
}) => {
	const [visibleReviewsCount, setVisibleReviewsCount] = useState(DEFAULT_VISIBLE_REVIEWS);

	const visibleReviews = reviews.slice(0, visibleReviewsCount);

	return (
		<>
			<ReviewsList>
				{visibleReviews.map((review) => (
					<ReviewsList.Item key={review.id}>
						<Review
							author={review.author}
							date={review.createdAt}
							rating={review.rating as ReviewProps['rating']}
							key={review.id}
							className={review.isSending ? 'opacity-50' : ''}
						>
							{review.description}
						</Review>
					</ReviewsList.Item>
				))}
			</ReviewsList>
			<div className="mt-12">
				{visibleReviewsCount < reviews.length && (
					<Button
						variant="tertiary"
						onClick={() =>
							setVisibleReviewsCount((prevCount) => prevCount + DEFAULT_VISIBLE_REVIEWS)
						}
					>
						Show more
					</Button>
				)}
			</div>
		</>
	);
};
