import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type ProductFragment,
} from '@/gql/graphql';
import { executeGraphql } from '@/api/api';

export const getProductsList = async (): Promise<ProductFragment[]> => {
	const graphqlResponse = await executeGraphql(ProductsGetListDocument);
	return graphqlResponse.products.data;
};

export const getProductById = async (id: string): Promise<ProductFragment | undefined | null> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, { id });
	return graphqlResponse.product;
};
