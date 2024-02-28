import React, { type ReactNode } from 'react';
import cx from 'classnames';

export type SectionProps = {
	children: ReactNode;
	isOdd?: boolean;
};

export const Section = ({
	children,
	isOdd,
	className,
	...props
}: SectionProps & { className?: string }) => (
	<section
		className={cx(
			'w-full',
			{
				'bg-gray-200 dark:bg-neutral-900': isOdd,
			},
			className,
		)}
		{...props}
	>
		<div className="mx-auto w-full max-w-screen-2xl p-6 md:p-12 lg:p-20 xl:p-24">{children}</div>
	</section>
);
