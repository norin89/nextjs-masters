'use client';

import { type Route } from 'next';
import { usePathname } from 'next/navigation';
import { NavBar } from '@/ui/organisms';
import { getCategories, getCollections } from '@/api/products';

export async function Navigation(props: {}) {
	const pathname = usePathname();

	return (
		<NavBar
			menu={[
				{ text: 'Home', href: '/' },
				{ text: 'All', href: '/products' },
				{ text: 'Categories', href: '/categories' },
				{ text: 'Collections', href: '/collections' },
			]}
			submenu={[
				...(`${pathname}/`.startsWith('/categories/')
					? (await getCategories()).map((category) => ({
							text: category.name,
							href: `/categories/${category.slug}` as Route,
						}))
					: []),
				...(`${pathname}/`.startsWith('/collections/')
					? (await getCollections()).map((collection) => ({
							text: collection.name,
							href: `/collections/${collection.slug}` as Route,
						}))
					: []),
			]}
			{...props}
		/>
	);
}
