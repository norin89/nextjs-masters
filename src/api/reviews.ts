import { executeGraphQL } from '@/api/api';
import {
	ReviewsGetByProductIdDocument,
	ReviewCreateDocument,
	type ProductFragment,
	type ReviewFragment,
} from '@/gql/graphql';
import { getProductById } from '@/api/products';

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

export async function addReview(data: {
	productId: ProductFragment['id'];
	rating: ReviewFragment['rating'];
	title: ReviewFragment['title'];
	description: ReviewFragment['description'];
	author: ReviewFragment['author'];
	email: ReviewFragment['email'];
}) {
	const { productId } = data;
	const product = await getProductById(productId);

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphQL({
		query: ReviewCreateDocument,
		variables: data,
		next: {
			tags: ['reviews'],
		},
	});
}
