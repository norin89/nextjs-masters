import type { ProductType } from '@/types';
import { ProductsList } from '@/ui/organisms';
import { Title } from '@/ui/atoms';

export default async function ProductsPage() {
	const res = await fetch('https://naszsklep-api.vercel.app/api/products?take=20');
	const products = (await res.json()) as ProductType[];

	return (
		<>
			<Title level={1} className="mb-8 text-center md:mb-12 lg:mb-16 xl:mb-24">
				Check out our amazing products!
			</Title>
			<ProductsList data-testid="products-list" products={products} />
		</>
	);
}
