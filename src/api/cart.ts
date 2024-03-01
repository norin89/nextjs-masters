import { cookies } from 'next/headers';

import { CART_COOKIE_NAME } from '@/config';
import { executeGraphql } from '@/api/api';
import {
	CartGetByIdDocument,
	CartFindOrCreateDocument,
	CartAddItemDocument,
	ProductGetByIdDocument,
	type CartFragment,
	type CartAddItemMutationVariables,
	CartRemoveItemDocument,
} from '@/gql/graphql';

export const getCartById = async (
	id: CartFragment['id'],
): Promise<CartFragment | null | undefined> => {
	const { cart } = await executeGraphql(CartGetByIdDocument, { id });

	return cart;
};

export async function getOrCreateCart(): Promise<CartFragment> {
	const cartId = cookies().get(CART_COOKIE_NAME)?.value;
	const { cartFindOrCreate: cart } = await executeGraphql(CartFindOrCreateDocument, { id: cartId });

	if (!cart) {
		throw new Error('Failed to create cart!');
	}

	cookies().set(CART_COOKIE_NAME, cart.id);

	return cart;
}

export async function addProductToCart(
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

export async function removeProductFromCart(
	id: CartAddItemMutationVariables['id'],
	productId: CartAddItemMutationVariables['productId'],
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql(CartRemoveItemDocument, {
		id,
		productId,
	});
}
