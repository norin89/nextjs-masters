import type { Metadata, Route } from 'next';
import { notFound } from 'next/navigation';

import { getCollections, getCollectionBySlug, getProductsByCollectionSlug } from '@/api/products';
import { ProductsList } from '@/ui/organisms';
import { Title } from '@/ui/atoms';
import { Links } from '@/ui/molecules/Links/Links';

const PRODUCTS_PER_PAGE = 4;

export async function generateMetadata({
	params,
}: {
	params: { collectionSlug: string };
}): Promise<Metadata> {
	const collection = await getCollectionBySlug(params.collectionSlug);

	if (!collection) return {};

	return {
		title: `${collection.name} | Collections`,
		description: collection.description,
	};
}

const countPages = (length: number) => Math.ceil(length / PRODUCTS_PER_PAGE);

export async function generateStaticParams() {
	const collections = await getCollections();
	const params: { collectionSlug: string; pageNumber: string }[] = [];

	for (const collection of collections) {
		const products = await getProductsByCollectionSlug(collection.slug);
		const pagesCount = countPages(products.length);

		Array.from(Array(pagesCount)).forEach((_, idx) => {
			params.push({
				collectionSlug: collection.slug,
				pageNumber: `${idx + 1}`,
			});
		});
	}

	return params;
}

export default async function CollectionPage({
	params,
}: {
	params: { collectionSlug: string; pageNumber: string };
}) {
	const collection = await getCollectionBySlug(params.collectionSlug);
	const products = await getProductsByCollectionSlug(params.collectionSlug);

	const pagesCount = countPages(products.length);
	const currentPage = parseInt(params.pageNumber, 10);
	const productsOnPage = products.slice(
		(currentPage - 1) * PRODUCTS_PER_PAGE,
		currentPage * PRODUCTS_PER_PAGE,
	);

	if (!collection || !productsOnPage.length) {
		return notFound();
	}

	return (
		<>
			<header className="mb-8 text-center md:mb-12 lg:mb-16 xl:mb-24">
				<Title level={1}>
					<span className="opacity-25">Collections / </span>
					{collection.name}
				</Title>
				{collection.description && <p className="mt-4">{collection.description}</p>}
			</header>
			<ProductsList data-testid="products-list" products={productsOnPage} />
			<nav className="mt-8 flex justify-center" aria-label="pagination">
				<Links
					links={Array.from(Array(pagesCount)).map((_, idx) => ({
						href: `/collections/${collection.slug}/${idx + 1}` as Route,
						text: `${idx + 1}`,
					}))}
					isExact
				/>
			</nav>
		</>
	);
}
