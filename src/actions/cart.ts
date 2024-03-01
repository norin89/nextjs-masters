'use server';

import { addProductToCart, getOrCreateCart, removeProductFromCart } from '@/api/cart';

export async function addProductToCartAction(formData: FormData) {
	// TODO: Typescript doesn't support typed `FormData` yet - https://github.com/microsoft/TypeScript/issues/43797
	const productId = formData.get('productId') as string;

	const cart = await getOrCreateCart();
	await addProductToCart(cart.id, productId);
}

export async function removeItemFromCartAction(formData: FormData) {
	// TODO: Typescript doesn't support typed `FormData` yet - https://github.com/microsoft/TypeScript/issues/43797
	const productId = formData.get('productId') as string;

	const cart = await getOrCreateCart();
	await removeProductFromCart(cart.id, productId);
}
