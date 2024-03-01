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
	cartCounter,
	...props
}: {
	categories: CategoryFragment[];
	collections: CollectionFragment[];
	cartCounter: number;
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
	);
}
