import {
	CategoriesGetDocument,
	CategoryGetBySlugDocument,
	ProductsGetDocument,
	ProductsGetByCategorySlugDocument,
	ProductGetByIdDocument,
	type ProductFragment,
	type CategoryFragment,
} from '@/gql/graphql';
import { executeGraphql } from '@/api/api';

export const getCategories = async (): Promise<CategoryFragment[]> => {
	const graphqlResponse = await executeGraphql(CategoriesGetDocument);
	return graphqlResponse.categories.data;
};

export const getCategoryBySlug = async (
	slug: CategoryFragment['slug'],
): Promise<CategoryFragment | undefined | null> => {
	const graphqlResponse = await executeGraphql(CategoryGetBySlugDocument, { slug });
	return graphqlResponse.category;
};

export const getProducts = async (): Promise<ProductFragment[]> => {
	const graphqlResponse = await executeGraphql(ProductsGetDocument);
	return graphqlResponse.products.data;
};

export const getProductsByCategorySlug = async (
	slug: CategoryFragment['slug'],
): Promise<ProductFragment[]> => {
	const graphqlResponse = await executeGraphql(ProductsGetByCategorySlugDocument, { slug });
	return graphqlResponse.category?.products || [];
};

export const getProductById = async (
	id: ProductFragment['id'],
): Promise<ProductFragment | undefined | null> => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, { id });
	return graphqlResponse.product;
};
