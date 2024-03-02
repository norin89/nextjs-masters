import { getProducts } from '@/api/products';
import { ProductsList } from '@/ui/organisms';
import { mapProductToProductBoxProps } from '@/mappers';

// TODO: Some logic and rules defining the related products
export async function RelatedProducts(props: {}) {
	const products = await getProducts(4);

	return (
		<ProductsList
			products={products.map((product) => mapProductToProductBoxProps(product))}
			{...props}
		/>
	);
}
