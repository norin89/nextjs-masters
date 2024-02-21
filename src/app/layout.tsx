import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NavBar } from '@/ui/organisms';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next.js Masters',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar
					links={[
						{ text: 'Home', href: '/' },
						{ text: 'All', href: '/products' },
					]}
				/>
				<main>
					<div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-24">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
