import React, { type ReactNode } from 'react';
import cx from 'classnames';

export type SectionProps = {
	children: ReactNode;
	isOdd?: boolean;
	isTight?: boolean;
};

export const Section = ({
	children,
	isOdd,
	isTight,
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
		<div
			className={cx('mx-auto w-full max-w-screen-2xl px-4 md:px-8 lg:px-16 xl:px-24', {
				'my-4 md:my-8 lg:my-16 xl:my-24': !isTight && !isOdd,
				'my-4 md:my-4 lg:my-8': isTight && !isOdd,
				'md:py-8 lg:py-16 xl:py-24': isOdd,
			})}
		>
			{children}
		</div>
	</section>
);
