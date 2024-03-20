'use client';

import type NextLink from 'next/link';

import { useLinksWithActive } from '@/hooks/useLinksWithActive';
import { Links } from '@/ui/molecules';
import { type LinkProps } from '@/ui/atoms';

export const LinksWithActive = ({ links, ...props }: { links: LinkProps<typeof NextLink>[] }) => (
	<Links links={useLinksWithActive(links)} {...props} />
);
