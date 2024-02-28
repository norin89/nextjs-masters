'use client';

import { type Route } from 'next';
import { usePathname } from 'next/navigation';
import { NavBar } from '@/ui/organisms';
import { getCategories, getCollections } from '@/api/products';

export async function Navigation(props: {}) {
	const pathname = usePathname();
	const categories = await getCategories();

	return (
		<NavBar
			menu={[
				{ text: 'Home', href: '/' },
				{ text: 'Collections', href: '/collections' },
				{ text: 'All', href: '/products' },
				...categories.map((category) => ({
					text: category.name,
					href: `/categories/${category.slug}` as Route,
				})),
			]}
			submenu={[
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
