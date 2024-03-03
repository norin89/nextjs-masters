'use client';

import type { ElementType } from 'react';

import { useLinksWithActive } from '@/hooks/useLinksWithActive';
import { Links } from '@/ui/molecules';
import { type LinkProps } from '@/ui/atoms';

export const LinksWithActive = ({ links, ...props }: { links: LinkProps<ElementType>[] }) => (
	<Links links={useLinksWithActive(links)} {...props} />
);
