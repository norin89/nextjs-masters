import React, { type ReactNode } from 'react';
import cx from 'classnames';

export type CardProps = {
	children: ReactNode;
};

export const Card = ({ children, className, ...props }: CardProps & { className?: string }) => (
	<section
		className={cx(
			'rounded-lg bg-white p-4 text-black shadow-md md:p-6 dark:bg-gray-800 dark:text-white',
			className,
		)}
		{...props}
	>
		{children}
	</section>
);
