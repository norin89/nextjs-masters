'use client';

import React, { Suspense } from 'react';
import NextLink from 'next/link';
import { ShoppingBag as IconShoppingBag } from 'lucide-react';

import { useLinksWithActive } from '@/hooks/useLinksWithActive';
import { NavigationSearch } from '@/components/NavigationSearch';
import { NavBar } from '@/ui/organisms';
import { Link, type LinkProps } from '@/ui/atoms';

export function Navigation({
	links,
	cartCounter,
}: {
	links: LinkProps<typeof NextLink>[];
	cartCounter: number;
}) {
	return (
		<NavBar links={useLinksWithActive(links)}>
			<div className="flex items-center gap-3">
				<Suspense fallback={<span aria-busy="true" />}>
					<NavigationSearch />
				</Suspense>
				<Link as={NextLink} href="/cart" title="Cart" className="relative">
					<IconShoppingBag />
					{cartCounter ? (
						<span className="absolute -end-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-pink-400 p-1 text-xs font-bold text-white dark:border-gray-900 dark:text-black">
							{cartCounter}
						</span>
					) : null}
				</Link>
			</div>
		</NavBar>
	);
}
