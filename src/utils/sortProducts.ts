import { type ProductFragment } from '@/gql/graphql';

export const SortProductsKey = ['price'] as const;
export type SortProductsKeyType = (typeof SortProductsKey)[number];

export const isProductsSortKey = (x?: string): x is SortProductsKeyType =>
	SortProductsKey.includes(x as SortProductsKeyType);

export const sortProducts = (
	array: ProductFragment[],
	{ key, type }: { key: SortProductsKeyType; type?: string },
): ProductFragment[] => {
	const sortedArray = array.sort((a, b) => (a[key] < b[key] ? -1 : 1));
	return type === 'desc' ? sortedArray.reverse() : sortedArray;
};
