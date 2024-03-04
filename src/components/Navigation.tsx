'use client';

import React, { type ReactNode } from 'react';
import type NextLink from 'next/link';

import { NavBar } from '@/ui/organisms';
import { type LinkProps } from '@/ui/atoms';
import { useLinksWithActive } from '@/hooks/useLinksWithActive';

export const Navigation = ({
	children,
	links,
}: {
	children?: ReactNode;
	links: LinkProps<typeof NextLink>[];
}) => <NavBar links={useLinksWithActive(links)}>{children}</NavBar>;
