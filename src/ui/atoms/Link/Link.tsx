import type { ElementType, MouseEventHandler, ReactNode } from 'react';
import cx from 'classnames';
import type { PolymorphicComponentProps } from '@/ui/types';

type LinkBaseProps = {
	children: ReactNode;
	isActive?: boolean;
	onClick?: MouseEventHandler<unknown>;
};

export type LinkProps<C extends ElementType> = PolymorphicComponentProps<C, LinkBaseProps>;

const DefaultElement = 'a';

/** Polymorphic link component - `as` prop takes component to be rendered -
 * e.g. `Link` component from frameworks like `Next` or `Gatsby`.  */
export const Link = <C extends ElementType = typeof DefaultElement>({
	as,
	children,
	isActive,
	className,
	onClick,
	...props
}: LinkProps<C> & { className?: string }) => {
	const Component = as || DefaultElement;

	return (
		<Component
			className={cx(
				'inline-block text-nowrap rounded px-4 py-2 transition-colors duration-500',
				{
					'bg-blue-500 text-white': isActive,
					'bg-transparent text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-800': !isActive,
				},
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</Component>
	);
};
