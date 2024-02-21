import { Title } from '@/ui/atoms';
import type { ProductType } from '@/types';

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const { productId } = params;
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${productId}`);

	const product = (await res.json()) as ProductType;

	return (
		<div className="align-center flex flex-wrap items-center justify-center">
			<div className="md:w-1/2 xl:w-1/3">
				<div className="bg-white p-10 text-gray-600">
					<img src={product.image} alt={product.title} className="w-full max-w-screen-sm" />
				</div>
			</div>
			<div className="md:w-1/2 md:p-8 xl:w-2/3">
				<header className="mb-8">
					<strong className="text-xs uppercase opacity-50">{product.category}</strong>
					<Title level={1}>{product.title}</Title>
				</header>
				<p className="my-4 text-lg">{product.description}</p>
				<p className="my-4">{product.longDescription}</p>
			</div>
		</div>
	);
}
