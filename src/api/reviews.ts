import { executeGraphQL } from '@/api/api';
import {
	ReviewsGetByProductIdDocument,
	type ProductFragment,
	type ReviewFragment,
} from '@/gql/graphql';

export const getReviewsByProductId = async (
	productId: ProductFragment['id'],
): Promise<ReviewFragment[] | undefined> => {
	const graphqlResponse = await executeGraphQL({
		query: ReviewsGetByProductIdDocument,
		variables: { productId },
	});
	return graphqlResponse.product?.reviews.map((review) => ({
		...review,
		createdAt: new Date(review.createdAt),
		updatedAt: new Date(review.updatedAt),
	}));
};
