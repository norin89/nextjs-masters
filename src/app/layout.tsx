import { type ReactNode } from 'react';
import type { Metadata, Route } from 'next';
import NextLink from 'next/link';
import { Inter } from 'next/font/google';
import cx from 'classnames';

import './globals.css';
import { Navigation } from '@/components/Navigation';
import { getCartFromCookies } from '@/api/cart';
import { getCategories } from '@/api/products';

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
	children: ReactNode;
}>) {
	const categories = await getCategories();
	const cart = await getCartFromCookies();
	const cartCounter = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<html lang="en">
			<body className={cx(inter.className, 'flex min-h-screen flex-col')}>
				<Navigation
					links={[
						{ as: NextLink, children: 'Home', href: '/' },
						{ as: NextLink, children: 'Collections', href: '/collections' },
						{ as: NextLink, children: 'All', href: '/products' },
						...categories.map((category) => ({
							as: NextLink,
							children: category.name,
							href: `/categories/${category.slug}` as Route,
						})),
					]}
					cartCounter={cartCounter}
				/>
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
