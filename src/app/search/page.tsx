import type { Metadata } from 'next';

import { SEARCH_QUERY_MIN_LENGTH } from '@/config';
import { getProductsBySearch } from '@/api/products';
import { Header, ProductsList, Section } from '@/ui/organisms';

export const metadata: Metadata = {
	title: `Search`,
};

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query?.trim() || '';

	const isQueryInvalid = query.length < SEARCH_QUERY_MIN_LENGTH;
	const products = isQueryInvalid ? [] : await getProductsBySearch(query);

	return (
		<Section>
			<Header level={1} suffix="Search" title={query} />
			{!products.length ? (
				<p className="text-center text-xl">
					{isQueryInvalid ? (
						<span className="text-red-500">
							Search query must include at least{' '}
							<strong>{SEARCH_QUERY_MIN_LENGTH} characters.</strong>
						</span>
					) : (
						'No products found.'
					)}
				</p>
			) : (
				<ProductsList data-testid="products-list" products={products} />
			)}
		</Section>
	);
}
