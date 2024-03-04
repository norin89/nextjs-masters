import NextLink from 'next/link';
import { ShoppingBag as IconShoppingBag } from 'lucide-react';

import { getCartFromCookies } from '@/api/cart';
import { Link } from '@/ui/atoms';

export async function NavigationCart() {
	const cart = await getCartFromCookies();
	const cartCounter = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<Link as={NextLink} href="/cart" title="Cart" className="relative">
			<IconShoppingBag />
			{cartCounter ? (
				<span className="absolute -end-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-pink-400 p-1 text-xs font-bold text-white dark:border-gray-900 dark:text-black">
					{cartCounter}
				</span>
			) : null}
		</Link>
	);
}
