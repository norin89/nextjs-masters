import { type ReactNode } from 'react';
import cx from 'classnames';

import { Links } from '@/ui/molecules/Links/Links';
import { type LinkProps } from '@/ui/atoms';

export type NavBarProps = {
	menu: LinkProps<string>[];
	submenu?: LinkProps<string>[];
	children?: ReactNode;
};

export const NavBar = ({
	menu,
	submenu,
	className,
	children,
	...props
}: NavBarProps & { className?: string }) => (
	<nav className={cx('sticky left-0 top-0 z-10 w-full backdrop-blur-md', className)} {...props}>
		<div className="flex w-full flex-wrap items-center border-b border-gray-200/90 bg-white/90 py-2 lg:py-4 dark:border-gray-900/90 dark:bg-neutral-950/90">
			<div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-6 md:px-12 lg:flex-row lg:px-20 xl:px-24">
				<Links links={[...menu]} className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0" />
				<div className="-order-1 mb-4 lg:order-9 lg:mb-0 lg:ml-auto">{children}</div>
			</div>
		</div>
		{submenu && submenu?.length > 0 && (
			<div className="flex w-full flex-wrap items-center border-b border-gray-200/90 bg-gray-50/90 py-2 lg:py-4 dark:border-gray-900/90 dark:bg-neutral-900/90">
				<div className="mx-auto flex w-full max-w-screen-2xl items-center px-6 md:px-12 lg:px-20 xl:px-24">
					<Links links={submenu} className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0" />
				</div>
			</div>
		)}
	</nav>
);
