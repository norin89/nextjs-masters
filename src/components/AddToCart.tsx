import type { Product } from '@/gql/graphql';
import { addItemToCartAction } from '@/actions/cart';

import { AddToCartButton } from '@/components/AddToCartButton';
export const AddToCart = ({ productId }: { productId: Product['id'] }) => (
	<form action={addItemToCartAction}>
		<input type="hidden" name="productId" value={productId} />
		<AddToCartButton />
	</form>
);
