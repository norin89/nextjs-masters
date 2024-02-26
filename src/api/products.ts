import {
	CategoriesGetDocument,
	CategoryGetBySlugDocument,
	CollectionsGetDocument,
	CollectionGetBySlugDocument,
	ProductsGetDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductGetByIdDocument,
	type CategoryFragment,
	type CollectionFragment,
	type ProductFragment,
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

export const getCollections = async (): Promise<CollectionFragment[]> => {
	const graphqlResponse = await executeGraphql(CollectionsGetDocument);
	return graphqlResponse.collections.data;
};

export const getCollectionBySlug = async (
	slug: CollectionFragment['slug'],
): Promise<CollectionFragment | undefined | null> => {
	const graphqlResponse = await executeGraphql(CollectionGetBySlugDocument, { slug });
	return graphqlResponse.collection;
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

export const getProductsByCollectionSlug = async (
	slug: CollectionFragment['slug'],
): Promise<ProductFragment[]> => {
	const graphqlResponse = await executeGraphql(ProductsGetByCollectionSlugDocument, { slug });
	return graphqlResponse.collection?.products || [];
};

export const getProductById = async (
	id: ProductFragment['id'],
): Promise<ProductFragment | undefined | null> => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, { id });
	return graphqlResponse.product;
};
