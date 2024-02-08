import { type ElementType } from 'react';
import cx from 'classnames';

export interface TitleProps {
	/** Title text */
	children: string;
	/** Used to render correct Hx element */
	level: 1 | 2 | 3 | 4 | 5;
	/** Overrides `level` visually */
	size?: 1 | 2 | 3 | 4 | 5;
}

export const Title = ({
	children,
	level,
	size = level,
	className,
}: TitleProps & { className?: string }) => {
	const Component: ElementType = `h${level}`;

	return (
		<Component
			className={cx(
				'font-semibold leading-tight tracking-tight',
				{
					'text-4xl md:text-5xl': size === 1,
					'text-3xl md:text-4xl': size === 2,
					'text-2xl md:text-3xl': size === 3,
					'text-xl md:text-2xl': size === 4,
					'text-lg md:text-xl': size === 5,
				},
				className,
			)}
		>
			{children}
		</Component>
	);
};
