'use client';

import { type Route } from 'next';
import NextLink from 'next/link';
import cx from 'classnames';

import { type LinkType } from '@/types/link.type';

export interface LinkProps<T extends string> {
	link: LinkType<T>;
}

export const Link = <T extends string>({
	link,
	className,
	...props
}: LinkProps<T> & { className?: string }) => {
	const { isActive, text, href, ...rest } = link;

	return (
		<NextLink
			className={cx(
				'inline-block text-nowrap rounded px-4 py-2 transition-colors duration-500',
				{
					'bg-blue-500 text-white': isActive,
					'bg-transparent text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-800': !isActive,
				},
				className,
			)}
			// TODO: move outside
			aria-current={isActive ? 'page' : undefined}
			href={href as Route}
			{...props}
			{...rest}
		>
			{text}
		</NextLink>
	);
};
