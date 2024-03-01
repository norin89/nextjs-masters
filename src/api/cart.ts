import { cookies } from 'next/headers';

import { CART_COOKIE_NAME } from '@/config';
import { executeGraphql } from '@/api/api';
import {
	CartGetByIdDocument,
	CartFindOrCreateDocument,
	CartAddItemDocument,
	CartRemoveItemDocument,
	ProductGetByIdDocument,
	CartChangeItemQuantityDocument,
	type CartFragment,
	type CartItem,
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
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
	quantity: CartItem['quantity'] = 1,
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	const cart = await getCartById(id);
	const productInCart = cart?.items.find((item) => item.product.id === productId);

	if (productInCart) {
		await changeProductQuantityInCart(
			id,
			productInCart.product.id,
			productInCart.quantity + quantity,
		);
		return;
	}

	await executeGraphql(CartAddItemDocument, {
		id,
		productId,
		quantity,
	});
}

export async function removeProductFromCart(
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
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

export async function changeProductQuantityInCart(
	id: CartFragment['id'],
	productId: CartItem['product']['id'],
	quantity: CartItem['quantity'],
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql(CartChangeItemQuantityDocument, {
		id,
		productId,
		quantity,
	});
}
