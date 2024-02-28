import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import cx from 'classnames';
import { Inter } from 'next/font/google';

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
	return (
		<html lang="en">
			<body className={cx(inter.className, 'flex min-h-screen flex-col')}>
				<Suspense fallback={<span aria-busy="true" />}>
					<Navigation />
				</Suspense>
				<main className="flex grow items-center">
					<div className="mx-auto max-w-screen-2xl p-8 md:p-12 lg:p-16 xl:p-24">{children}</div>
				</main>
			</body>
		</html>
	);
}
