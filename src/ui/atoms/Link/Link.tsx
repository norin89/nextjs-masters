'use client';

import { type ReactNode } from 'react';
import { type Route } from 'next';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import cx from 'classnames';

export interface LinkProps<T extends string> extends NextLinkProps<T> {
	children: ReactNode;
	isActive?: boolean;
}

/** Link component that extends Next.js `<Link />` with styles and `isActive` prop */
export const Link = <T extends string>({
	children,
	href,
	isActive,
	className,
	...props
}: LinkProps<T> & { className?: string }) => (
	<NextLink
		className={cx(
			'inline-block text-nowrap rounded px-4 py-2 transition-colors duration-500',
			{
				'bg-blue-500 text-white': isActive,
				'bg-transparent text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-800': !isActive,
			},
			className,
		)}
		href={href as Route}
		{...props}
	>
		{children}
	</NextLink>
);
