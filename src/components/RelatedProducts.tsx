import { ProductsList } from '@/ui/organisms';
import { getProducts } from '@/api/products';

// TODO: Some logic and rules defining the related products
export async function RelatedProducts(props: {}) {
	const products = await getProducts(4);

	return <ProductsList products={products} {...props} />;
}
