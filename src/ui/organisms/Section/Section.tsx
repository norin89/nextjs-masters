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
			className={cx('mx-auto w-full max-w-screen-2xl p-4 md:px-8 lg:px-16 xl:px-24', {
				'md:py-8 lg:py-16 xl:py-24': !isTight,
				'md:py-4 lg:py-8': isTight,
			})}
		>
			{children}
		</div>
	</section>
);
