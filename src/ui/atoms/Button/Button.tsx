import cx from 'classnames';
import React, { type ComponentProps, type ElementType, type MouseEventHandler } from 'react';

const DefaultElement = 'button';

export interface ButtonBaseProps<C> {
	/** Component to be rendered. <strong>Must</strong> accept `children` and `className` props. */
	as?: C;
	/** Button text */
	children: string;
	variant?: 'primary' | 'secondary' | 'add' | 'remove';
	/** Icon component (from `lucide-react`) or SVG image */
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconPosition?: 'before' | 'after';
	onClick?: MouseEventHandler<unknown>;
}

type ButtonProps<C extends ElementType> = ButtonBaseProps<C> &
	Omit<ComponentProps<C>, keyof ButtonBaseProps<C>>;

export const Button = <C extends ElementType = typeof DefaultElement>({
	as,
	children,
	variant = 'secondary',
	icon,
	iconPosition = 'after',
	onClick,
	className,
	...props
}: ButtonProps<C> & { className?: string }) => {
	const Component = as || DefaultElement;
	const Icon = icon;

	return (
		<Component
			className={cx(
				'inline-flex items-center rounded px-4 py-2 font-medium transition-all duration-500',
				{ 'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' },
				{ 'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary' },
				{ 'bg-green-600 text-white hover:bg-green-700': variant === 'add' },
				{ 'bg-red-600 text-white hover:bg-red-700': variant === 'remove' },
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
			{Icon && (
				<Icon
					className={cx('h-4 w-4', {
						'-order-1 mr-3': iconPosition === 'before',
						'ml-3': iconPosition != 'before',
					})}
				/>
			)}
		</Component>
	);
};
