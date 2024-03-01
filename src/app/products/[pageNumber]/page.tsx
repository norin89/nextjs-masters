import type { Metadata, Route } from 'next';
import { notFound } from 'next/navigation';

import { getProducts } from '@/api/products';
import { Header, ProductsList, Section } from '@/ui/organisms';
import { Links } from '@/ui/molecules';

const PRODUCTS_PER_PAGE = 4;

export const metadata: Metadata = {
	title: `All Products`,
};

const countPages = (length: number) => Math.ceil(length / PRODUCTS_PER_PAGE);

export async function generateStaticParams() {
	const products = await getProducts();
	const pagesCount = countPages(products.length);

	return Array.from(Array(pagesCount)).map((_, idx) => ({
		pageNumber: `${idx + 1}`,
	}));
}

export default async function ProductsPaginatedPage({
	params,
}: {
	params: { pageNumber: string };
}) {
	const products = await getProducts();
	const pagesCount = countPages(products.length);
	const currentPage = parseInt(params.pageNumber);
	const productsOnPage = products.slice(
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		currentPage * PRODUCTS_PER_PAGE,
	);

	if (!productsOnPage.length) {
		return notFound();
	}

	return (
		<Section>
			<Header level={1} title="All products" />
			<ProductsList data-testid="products-list" products={productsOnPage} />
			<nav className="mt-12 flex justify-center" aria-label="pagination">
				<Links
					links={Array.from(Array(pagesCount)).map((_, idx) => ({
						children: `${idx + 1}`,
						href: `/products/${idx + 1}` as Route,
					}))}
					isExact
				/>
			</nav>
		</Section>
	);
}
