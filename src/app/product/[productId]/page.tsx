import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import NextImage from 'next/image';

import { Suspense } from 'react';
import { formatPrice } from '@/utils/formatPrice';
import { getProductById } from '@/api/products';
import { RelatedProducts } from '@/components/RelatedProducts';
import { Badge, Title } from '@/ui/atoms';
import { Header, Section } from '@/ui/organisms';

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
							<Title level={1} className="my-2">
								{product.name}
							</Title>
							<strong className="mb-2 block self-end text-4xl font-medium text-pink-500">
								{formatPrice(product.price)}
							</strong>
						</header>
						<p className="my-4">{product.description}</p>
					</div>
				</div>
			</Section>
			<Section isOdd>
				<Header title="Related products"></Header>
				<Suspense fallback={<span aria-busy="true" />}>
					<RelatedProducts />
				</Suspense>
			</Section>
		</>
	);
}
