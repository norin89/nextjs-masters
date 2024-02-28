import type { Metadata } from 'next';

import { getProductsBySearch } from '@/api/products';
import { Header, ProductsList, Section } from '@/ui/organisms';

const QUERY_MIN_LENGTH = 3;

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

	const isQueryInvalid = query.length < QUERY_MIN_LENGTH;
	const products = isQueryInvalid ? [] : await getProductsBySearch(query);

	return (
		<Section>
			<Header level={1} suffix="Search" title={query} />
			{!products.length ? (
				<p className="text-center text-xl">
					{isQueryInvalid ? (
						<span className="text-red-500">
							Search query must include at least <strong>{QUERY_MIN_LENGTH} characters.</strong>
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
