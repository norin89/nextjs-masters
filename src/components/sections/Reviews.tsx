import { type ProductFragment } from '@/gql/graphql';
import { getReviewsByProductId } from '@/api/reviews';
import { ProductReviews } from '@/components/ProductReviews';
export async function SectionReviews({ productId }: { productId: ProductFragment['id'] }) {
	const reviews = (await getReviewsByProductId(productId)) || [];

	if (reviews.length) {
		return <ProductReviews reviews={reviews} />;
	}

	return <p>No reviews yet...</p>;
}
