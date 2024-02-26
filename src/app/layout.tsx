import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navigation } from '@/app/_navigation';
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
			<body className={inter.className}>
				<Suspense fallback={<span aria-busy="true" />}>
					<Navigation />
				</Suspense>
				<main>
					<div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-24">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
