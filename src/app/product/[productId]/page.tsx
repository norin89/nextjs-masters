import { Suspense } from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import NextImage from 'next/image';

import { getProductById } from '@/api/products';
import { formatPrice } from '@/utils/formatPrice';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { RelatedProducts } from '@/components/RelatedProducts';
import { AddToCart } from '@/components/AddToCart';
import { Header, Section } from '@/ui/organisms';
import { Badge, Title } from '@/ui/atoms';

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await getProductById(params.productId);

	if (!product) return {};

	return {
		title: product.name,
		description: product.description,
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		return notFound();
	}

	return (
		<>
			<Section>
				<div className="align-center flex flex-wrap items-center justify-center">
					<div className="md:w-1/2 xl:w-1/3">
						<div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 md:mb-0 dark:border-gray-800">
							{product.images[0] && (
								<NextImage
									src={product.images[0].url}
									alt={product.name}
									className="w-full max-w-screen-sm"
									width={600}
									height={600}
								/>
							)}
						</div>
					</div>
					<div className="md:w-1/2 md:p-8 xl:w-2/3">
						<header className="mb-8">
							{product.categories[0] && <Badge>{product.categories[0]?.name}</Badge>}
							{product.rating && (
								<span className="ml-3 text-xs">
									<svg
										className="ml-auto mr-1 inline-block h-4 w-4 align-text-bottom text-yellow-500"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
									{product.rating.toFixed(2)}
								</span>
							)}
							<Title level={1} className="my-2">
								{product.name}
							</Title>
							<strong className="mb-2 block self-end text-4xl font-medium text-pink-500">
								{formatPrice(product.price)}
							</strong>
						</header>
						<p className="my-4">{product.description}</p>
						<AddToCart productId={product.id} />
					</div>
				</div>
			</Section>
			<Section isOdd>
				<Header title="Reviews"></Header>
				<Suspense fallback={<span aria-busy="true" />}>
					<ReviewsSection productId={product.id} />
				</Suspense>
			</Section>
			<Section>
				<Header title="Related products"></Header>
				<Suspense fallback={<span aria-busy="true" />}>
					<RelatedProducts data-testid="related-products" />
				</Suspense>
			</Section>
		</>
	);
}
