import { type ProductFragment } from '@/gql/graphql';
import { ProductsList as ProductsListComponent } from '@/ui/organisms';
import { mapProductToProductBoxProps } from '@/mappers';

export const Products = ({ products, ...props }: { products: ProductFragment[] }) => (
	<ProductsListComponent
		products={products.map((product) => mapProductToProductBoxProps(product))}
		{...props}
	/>
);
