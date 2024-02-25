import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Title } from '@/ui/atoms';
import { formatPrice } from '@/utils/formatPrice';
import { getProductById } from '@/api/products';

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
		<div className="align-center flex flex-wrap items-center justify-center">
			<div className="md:w-1/2 xl:w-1/3">
				<div className="mb-8 bg-white p-10 text-gray-600 md:mb-0">
					<img src={product.image} alt={product.name} className="w-full max-w-screen-sm" />
				</div>
			</div>
			<div className="md:w-1/2 md:p-8 xl:w-2/3">
				<header className="mb-8">
					<strong className="mb-2 block self-end text-6xl font-medium text-pink-500">
						{formatPrice(product.price)}
					</strong>
					<Title level={1}>{product.name}</Title>
					<strong className="text-xs uppercase opacity-50">{product.category}</strong>
				</header>
				<p className="my-4">{product.description}</p>
			</div>
		</div>
	);
}
