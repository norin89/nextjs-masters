import type { Metadata, Route } from 'next';

import type { ProductType } from '@/types';
import { ProductsList } from '@/ui/organisms';
import { Title } from '@/ui/atoms';
import { Links } from '@/ui/molecules/Links/Links';

const PRODUCTS_PER_PAGE = 4;

export const metadata: Metadata = {
	title: `All Products`,
};

const getProducts = async () => {
	const res = await fetch('https://naszsklep-api.vercel.app/api/products');
	return (await res.json()) as ProductType[];
};

export default async function ProductsPaginatedPage({
	params,
}: {
	params: { pageNumber: string };
}) {
	const products = await getProducts();
	const pagesCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);
	const currentPage = parseInt(params.pageNumber, 10);
	const productsOnPage = products.slice(
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		currentPage * PRODUCTS_PER_PAGE,
	);

	return (
		<>
			<Title level={1} className="mb-8 text-center md:mb-12 lg:mb-16 xl:mb-24">
				Check out our amazing products!
			</Title>
			<ProductsList data-testid="products-list" products={productsOnPage} />
			<nav className="mt-8 flex justify-center" aria-label="pagination">
				<Links
					links={Array.from(Array(pagesCount)).map((_, idx) => ({
						href: `/products/${idx + 1}` as Route,
						text: `${idx + 1}`,
					}))}
					isExact
				/>
			</nav>
		</>
	);
}
