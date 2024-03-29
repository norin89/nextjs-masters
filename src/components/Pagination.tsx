'use client';

import type NextLink from 'next/link';

import { type LinkProps } from '@/ui/atoms';
import { LinksWithActive } from '@/components/LinksWithActive';

export const Pagination = ({ links, ...props }: { links: LinkProps<typeof NextLink>[] }) => (
	<nav className="mt-12 flex justify-center" aria-label="pagination">
		<LinksWithActive links={links} {...props} />
	</nav>
);
