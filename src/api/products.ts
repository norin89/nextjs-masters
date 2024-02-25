import type { ProductType } from '@/types';
import { ProductGetByIdDocument, ProductsGetListDocument } from '@/gql/graphql';
import { executeGraphql } from '@/api/api';

export const getProductsList = async (): Promise<ProductType[]> => {
	const graphqlResponse = await executeGraphql(ProductsGetListDocument);
	return graphqlResponse.products.data.map((product) => ({
		id: product.id,
		name: product.name,
		price: product.price,
		description: product.description,
		image: product.images[0]?.url || undefined,
		category: product.categories[0]?.name || undefined,
	}));
};

export const getProductById = async (id: string): Promise<ProductType | undefined> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, { id });
	const product = graphqlResponse.product;

	if (!product) {
		return undefined;
	}

	return {
		id: product.id,
		name: product.name,
		price: product.price,
		description: product.description,
		image: product.images[0]?.url || undefined,
		category: product.categories[0]?.name || undefined,
	};
};
