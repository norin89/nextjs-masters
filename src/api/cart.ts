import { cookies } from 'next/headers';

import { CART_COOKIE_NAME } from '@/config';
import { executeGraphQL } from '@/api/api';
import {
	CartGetByIdDocument,
	CartFindOrCreateDocument,
	CartAddItemDocument,
	CartRemoveItemDocument,
	CartChangeItemQuantityDocument,
	type CartFragment,
	type CartItem,
} from '@/gql/graphql';
import { getProductById } from '@/api/products';

export const getCartById = async (
	id: CartFragment['id'],
): Promise<CartFragment | null | undefined> => {
	const { cart } = await executeGraphQL({
		query: CartGetByIdDocument,
		variables: { id },
		next: {
			tags: ['cart'],
		},
	});

	return cart;
};

export const getCartFromCookies = async (): Promise<CartFragment | null | undefined> => {
	const cartId = cookies().get(CART_COOKIE_NAME)?.value;

	return cartId ? getCartById(cartId) : null;
};

export async function getOrCreateCart(): Promise<CartFragment> {
	const cartId = cookies().get(CART_COOKIE_NAME)?.value;

	const { cartFindOrCreate: cart } = await executeGraphQL({
		query: CartFindOrCreateDocument,
		variables: { id: cartId },
		next: {
			tags: ['cart'],
		},
	});

	if (!cart) {
		throw new Error('Failed to create cart!');
	}

	if (!cartId) {
		cookies().set(CART_COOKIE_NAME, cart.id);
	}

	return cart;
}

export async function addProductToCart(
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
	quantity: CartItem['quantity'] = 1,
) {
	const product = await getProductById(productId);

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	const cart = await getCartById(id);
	const productInCart = cart?.items.find((item) => item.product.id === productId);

	if (productInCart) {
		// TODO: Validate if MAX_QUANTITY is not reached before adding
		await changeProductQuantityInCart(
			id,
			productInCart.product.id,
			productInCart.quantity + quantity,
		);
		return;
	}

	await executeGraphQL({
		query: CartAddItemDocument,
		variables: {
			id,
			productId,
			quantity,
		},
		next: {
			tags: ['cart'],
		},
	});
}

export async function removeProductFromCart(
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
) {
	const product = await getProductById(productId);

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphQL({
		query: CartRemoveItemDocument,
		variables: {
			id,
			productId,
		},
		next: {
			tags: ['cart'],
		},
	});
}

export async function changeProductQuantityInCart(
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
	quantity: CartItem['quantity'],
) {
	const product = await getProductById(productId);

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphQL({
		query: CartChangeItemQuantityDocument,
		variables: {
			id,
			productId,
			quantity,
		},
		next: {
			tags: ['cart'],
		},
	});
}
