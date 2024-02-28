'use client';

import { type Route } from 'next';
import { usePathname } from 'next/navigation';

import type { CategoryFragment, CollectionFragment } from '@/gql/graphql';
import { NavBar } from '@/ui/organisms';

export function Navigation({
	categories,
	collections,
	...props
}: {
	categories: CategoryFragment[];
	collections: CollectionFragment[];
}) {
	const pathname = usePathname();

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
					? collections.map((collection) => ({
							text: collection.name,
							href: `/collections/${collection.slug}` as Route,
						}))
					: []),
			]}
			{...props}
		/>
	);
}
