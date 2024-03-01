import React from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import NextLink from 'next/link';

import { CART_COOKIE_NAME } from '@/config';
import { getCartById } from '@/api/cart';
import { formatPrice } from '@/utils/formatPrice';
import { QuantityInput } from '@/app/cart/QuantityInput';
import { Header, Section } from '@/ui/organisms';
import { Button, Title } from '@/ui/atoms';

export const metadata: Metadata = {
	title: `Cart`,
};

export default async function ProductsPaginatedPage() {
	const cartId = cookies().get(CART_COOKIE_NAME)?.value;
	const cart = cartId ? await getCartById(cartId) : null;

	const totalPrice = cart?.items.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0,
	);

	return (
		<Section>
			<Header level={1} title="Shopping cart" />
			{!cart ? (
				<div className="text-center">
					<p className="m-8 text-xl">Your cart is empty</p>
					<Button as={NextLink} variant="primary" href="/products">
						Select products
					</Button>
				</div>
			) : (
				<div className="align-center grid grid-flow-row-dense grid-cols-3 gap-4">
					<div className="col-span-3 md:col-span-2">
						<div className="overflow-x-auto rounded-lg bg-white p-4 text-black shadow-md md:p-6 dark:bg-gray-800 dark:text-white">
							<table className="-mt-4 block w-full text-left sm:table">
								<tbody className="block sm:table-row-group">
									{cart.items.map((item) => (
										<tr
											className="block border-b sm:table-row dark:border-gray-700"
											key={item.product.id}
										>
											<td className="block py-4 sm:table-cell">
												<NextLink
													href={`/product/${item.product.id}`}
													className="group flex items-center gap-3 md:gap-4 xl:gap-6"
												>
													{item.product.images[0] && (
														<Image
															className="inline-block w-24 md:w-32 xl:w-48"
															src={item.product.images[0].url}
															alt={item.product.images[0].alt || item.product.name}
															width={192}
															height={192}
														/>
													)}
													<Title
														level={2}
														size={4}
														className="transition-colors duration-500 group-hover:text-pink-500"
													>
														{item.product.name}
													</Title>
												</NextLink>
											</td>
											<td className="block py-4 sm:table-cell">
												<QuantityInput item={item} />
											</td>
										</tr>
									))}
									<tr className="block sm:table-row dark:border-gray-700">
										<td colSpan={2} className="block pb-3 pt-6 text-center sm:table-cell">
											<Button as={NextLink} variant="secondary" href="/products">
												Continue shopping
											</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className="col-span-3 md:col-span-1">
						<div className="sticky top-[100px] rounded-lg bg-white p-4 text-black shadow-md md:p-6 dark:bg-gray-800 dark:text-white">
							<Title level={2} size={3}>
								Order summary
							</Title>
							{totalPrice && (
								<div className="py-8">
									Total Price:
									<div className="text-5xl text-pink-500">{formatPrice(totalPrice)}</div>
								</div>
							)}
							<hr />
							<p className="my-4">Shipping will be calculated at the next step.</p>
							<Button as={NextLink} variant="primary" href="/" isBlock>
								Checkout
							</Button>
						</div>
					</div>
				</div>
			)}
		</Section>
	);
}
