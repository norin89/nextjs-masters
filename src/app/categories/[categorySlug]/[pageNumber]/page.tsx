import type { Metadata, Route } from 'next';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from '@/api/products';
import { Products } from '@/components/Products';
import { Pagination } from '@/components/Pagination';
import { Header, Section } from '@/ui/organisms';

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
	const currentPage = parseInt(params.pageNumber);
	const productsOnPage = products.slice(
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		currentPage * PRODUCTS_PER_PAGE,
	);

	if (!category || !productsOnPage.length) {
		return notFound();
	}

	return (
		<Section>
			<Header level={1} suffix="Categories" title={category.name} lead={category.description} />
			<Products data-testid="products-list" products={productsOnPage} />
			<Pagination
				links={Array.from(Array(pagesCount)).map((_, idx) => ({
					as: NextLink,
					children: `${idx + 1}`,
					href: `/categories/${category.slug}/${idx + 1}` as Route,
				}))}
			/>
		</Section>
	);
}
