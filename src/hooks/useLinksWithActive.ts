'use client';

import { type ElementType } from 'react';
import { usePathname } from 'next/navigation';

import type { LinkProps } from '@/ui/atoms';

export function useLinksWithActive(
	links: Omit<LinkProps<ElementType>[], 'isActive'>,
): LinkProps<ElementType>[] {
	const pathname = usePathname();

	return links.map((link) => ({
		...link,
		isActive: `${pathname}/`.startsWith(`${link.href as string}/`),
	}));
}
