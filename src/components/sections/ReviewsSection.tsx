import { type ProductFragment } from '@/gql/graphql';
import { getReviewsByProductId } from '@/api/reviews';
import { Reviews } from '@/components/sections/Reviews';

export async function ReviewsSection({ productId }: { productId: ProductFragment['id'] }) {
	// TODO: Reviews shouldn't be fetched all at once
	const reviews = ((await getReviewsByProductId(productId)) || []).reverse();

	return <Reviews productId={productId} reviews={reviews} />;
}
