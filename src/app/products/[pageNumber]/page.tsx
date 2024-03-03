import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { getProducts } from '@/api/products';
import { Header, Section } from '@/ui/organisms';
import { Products } from '@/components/Products';
import { Pagination } from '@/components/Pagination';

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
			<Products data-testid="products-list" products={productsOnPage} />
			<Pagination
				links={Array.from(Array(pagesCount)).map((_, idx) => ({
					as: NextLink,
					children: `${idx + 1}`,
					href: `/products/${idx + 1}`,
				}))}
			/>
		</Section>
	);
}
