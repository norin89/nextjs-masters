import type { Metadata, Route } from 'next';
import { notFound } from 'next/navigation';

import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from '@/api/products';
import { Header, ProductsList } from '@/ui/organisms';
import { Links } from '@/ui/molecules/Links/Links';

const PRODUCTS_PER_PAGE = 4;

export async function generateMetadata({
	params,
}: {
	params: { categorySlug: string };
}): Promise<Metadata> {
	const category = await getCategoryBySlug(params.categorySlug);

	if (!category) return {};

	return {
		title: `${category.name} | Categories`,
		description: category.description,
	};
}

const countPages = (length: number) => Math.ceil(length / PRODUCTS_PER_PAGE);

export async function generateStaticParams() {
	const categories = await getCategories();
	const params: { categorySlug: string; pageNumber: string }[] = [];

	for (const category of categories) {
		const products = await getProductsByCategorySlug(category.slug);
		const pagesCount = countPages(products.length);

		Array.from(Array(pagesCount)).forEach((_, idx) => {
			params.push({
				categorySlug: category.slug,
				pageNumber: `${idx + 1}`,
			});
		});
	}

	return params;
}

export default async function CategoryPage({
	params,
}: {
	params: { categorySlug: string; pageNumber: string };
}) {
	const category = await getCategoryBySlug(params.categorySlug);
	const products = await getProductsByCategorySlug(params.categorySlug);

	const pagesCount = countPages(products.length);
	const currentPage = parseInt(params.pageNumber, 10);
	const productsOnPage = products.slice(
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		currentPage * PRODUCTS_PER_PAGE,
	);

	if (!category || !productsOnPage.length) {
		return notFound();
	}

	return (
		<>
			<Header suffix="Categories" title={category.name} lead={category.description} />
			<ProductsList data-testid="products-list" products={productsOnPage} />
			<nav className="mt-12 flex justify-center" aria-label="pagination">
				<Links
					links={Array.from(Array(pagesCount)).map((_, idx) => ({
						href: `/categories/${category.slug}/${idx + 1}` as Route,
						text: `${idx + 1}`,
					}))}
					isExact
				/>
			</nav>
		</>
	);
}
