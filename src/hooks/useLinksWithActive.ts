'use client';

import { type ElementType } from 'react';
import type NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { LinkProps } from '@/ui/atoms';

export function useLinksWithActive(
	links: Omit<LinkProps<typeof NextLink>[], 'isActive'>,
): LinkProps<ElementType>[] {
	const pathname = usePathname();

	return links.map((link) => {
		const href = typeof link.href === 'string' ? link.href : link.href.pathname;
		const isActive = `${pathname}/`.startsWith(`${href}/`);

		return {
			...link,
			isActive,
			'aria-current': isActive ? 'page' : undefined,
		};
	});
}
