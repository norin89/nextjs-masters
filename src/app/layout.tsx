import React from 'react';
import type { Metadata } from 'next';
import cx from 'classnames';
import { Inter } from 'next/font/google';

import { getCategories, getCollections } from '@/api/products';
import { Navigation } from '@/components/Navigation';
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
	const collections = await getCollections();

	return (
		<html lang="en">
			<body className={cx(inter.className, 'flex min-h-screen flex-col')}>
				<Navigation categories={categories} collections={collections} />
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
