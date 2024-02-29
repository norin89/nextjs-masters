import cx from 'classnames';
import React, { type ComponentProps, type ElementType, type MouseEventHandler } from 'react';

const DefaultElement = 'button';

export interface ButtonBaseProps<C> {
	/** Component to be rendered. <strong>Must</strong> accept `children` and `className` props. */
	as?: C;
	/** Button text */
	children: string;
	variant?: 'primary' | 'secondary' | 'tertiary' | 'add' | 'remove';
	/** Icon component (from `lucide-react`) or SVG image */
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconPosition?: 'before' | 'after';
	/** If `true` will be full width */
	isBlock?: boolean;
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
	isBlock,
	onClick,
	className,
	...props
}: ButtonProps<C> & { className?: string }) => {
	const Component = as || DefaultElement;
	const Icon = icon;

	return (
		<Component
			className={cx(
				'inline-flex min-h-10 items-center justify-center rounded px-3 py-2 font-medium transition-all duration-500',
				{ 'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' },
				{ 'border border-current text-blue-500 hover:text-blue-400': variant === 'secondary' },
				{ 'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'tertiary' },
				{ 'bg-green-600 text-white hover:bg-green-700': variant === 'add' },
				{ 'bg-red-600 text-white hover:bg-red-700': variant === 'remove' },
				{ 'w-full': isBlock },
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
			{Icon && (
				<Icon
					className={cx('h-4 w-4', {
						'-order-1': iconPosition === 'before',
						'mr-3': iconPosition === 'before' && children,
						'ml-3': iconPosition != 'before' && children,
					})}
				/>
			)}
		</Component>
	);
};
