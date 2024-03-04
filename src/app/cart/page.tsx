import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import NextLink from 'next/link';

import { CART_COOKIE_NAME } from '@/config';
import { getCartById } from '@/api/cart';
import { QuantityAndPrice } from '@/app/cart/QuantityAndPrice';
import { Summary } from '@/app/cart/Summary';
import { Header, Section } from '@/ui/organisms';
import { Card } from '@/ui/molecules';
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
			{!cart || cart.items.length <= 0 ? (
				<div className="text-center">
					<p className="m-8 text-xl">Your cart is empty</p>
					<Button as={NextLink} variant="primary" href="/products">
						Select products
					</Button>
				</div>
			) : (
				<div className="align-center grid grid-flow-row-dense grid-cols-3 gap-4">
					<div className="col-span-3 lg:col-span-2">
						<Card>
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
													className="group inline-flex items-center gap-3 md:gap-4 xl:gap-6"
												>
													{item.product.images[0] && (
														<Image
															className="inline-block w-32 md:w-40 lg:w-32 2xl:w-48"
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
											<td className="block pb-4 pt-0 sm:table-cell sm:pt-4">
												<QuantityAndPrice item={item} />
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
						</Card>
					</div>

					<Summary totalPrice={totalPrice} />
				</div>
			)}
		</Section>
	);
}
