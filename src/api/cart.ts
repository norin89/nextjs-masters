import { cookies } from 'next/headers';

import { executeGraphql } from '@/api/api';
import {
	CartGetByIdDocument,
	CartFindOrCreateDocument,
	CartAddItemDocument,
	ProductGetByIdDocument,
	type CartFragment,
	type CartAddItemMutationVariables,
} from '@/gql/graphql';

export const getCartById = async (
	id: CartFragment['id'],
): Promise<CartFragment | null | undefined> => {
	const { cart } = await executeGraphql(CartGetByIdDocument, { id });
	return cart;
};

export async function getOrCreateCart(): Promise<CartFragment> {
	const cartId = cookies().get('cartId')?.value;
	const { cartFindOrCreate: cart } = await executeGraphql(CartFindOrCreateDocument, { id: cartId });

	if (!cart) {
		throw new Error('Failed to create cart!');
	}

	cookies().set('cartId', cart.id);

	return cart;
}

export async function addItemToCart(
	id: CartAddItemMutationVariables['id'],
	productId: CartAddItemMutationVariables['productId'],
	quantity: CartAddItemMutationVariables['quantity'] = 1,
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql(CartAddItemDocument, {
		id,
		productId,
		quantity,
	});
}
