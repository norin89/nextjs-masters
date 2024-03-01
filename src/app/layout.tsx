import React, { Suspense } from 'react';
import type { Metadata, Route } from 'next';
import { Inter } from 'next/font/google';
import { ShoppingBag as IconShoppingBag } from 'lucide-react';
import cx from 'classnames';

import { getCartFromCookies } from '@/api/cart';
import { getCategories } from '@/api/products';
import { NavigationSearch } from '@/components/NavigationSearch';
import { NavBar } from '@/ui/organisms';
import { Link } from '@/ui/atoms';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Next.js Masters',
		template: '%s | Next.js Masters',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const categories = await getCategories();
	const cart = await getCartFromCookies();

	const cartCounter = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<html lang="en">
			<body className={cx(inter.className, 'flex min-h-screen flex-col')}>
				<NavBar
					links={[
						{ children: 'Home', href: '/' },
						{ children: 'Collections', href: '/collections' },
						{ children: 'All', href: '/products' },
						...categories.map((category) => ({
							children: category.name,
							href: `/categories/${category.slug}` as Route,
						})),
					]}
				>
					<div className="flex items-center gap-3">
						<Suspense fallback={<span aria-busy="true" />}>
							<NavigationSearch />
						</Suspense>
						<Link href="/cart" title="Cart" className="relative">
							<IconShoppingBag />
							{cartCounter && (
								<span className="absolute -end-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-pink-400 text-xs font-bold text-white dark:border-gray-900 dark:text-black">
									{cartCounter}
								</span>
							)}
						</Link>
					</div>
				</NavBar>
				<main className="flex grow items-center">
					<div className="grow">{children}</div>
				</main>
				<p className="p-6 text-center text-sm opacity-60">
					{'Demo app for '}
					<a href="https://www.nextjsmasters.pl/" target="_blank" className="hover:underline">
						&quot;Next.js Masters&quot;
					</a>
					{' developed by '}
					<a href="https://goscicki.eu/" target="_blank" className="hover:underline">
						Marcin Gościcki
					</a>
				</p>
			</body>
		</html>
	);
}
