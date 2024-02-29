'use client';

import { Suspense } from 'react';
import { type Route } from 'next';
import { usePathname } from 'next/navigation';
import { ShoppingBag as IconShoppingBag } from 'lucide-react';

import type { CategoryFragment, CollectionFragment } from '@/gql/graphql';
import { NavigationSearch } from '@/components/NavigationSearch';
import { NavBar } from '@/ui/organisms';
import { Link } from '@/ui/atoms';

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
				{ children: 'Home', href: '/' },
				{ children: 'Collections', href: '/collections' },
				{ children: 'All', href: '/products' },
				...categories.map((category) => ({
					children: category.name,
					href: `/categories/${category.slug}` as Route,
				})),
			]}
			submenu={[
				...(`${pathname}/`.startsWith('/collections/')
					? collections.map((collection) => ({
							children: collection.name,
							href: `/collections/${collection.slug}` as Route,
						}))
					: []),
			]}
			{...props}
		>
			<div className="flex items-center gap-3">
				<Suspense fallback={<span aria-busy="true" />}>
					<NavigationSearch />
				</Suspense>
				<Link href="/cart" title="Cart">
					<span className="sr-only">Cart</span>
					<IconShoppingBag />
				</Link>
			</div>
		</NavBar>
	);
}
