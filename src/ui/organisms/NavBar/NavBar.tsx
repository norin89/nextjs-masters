import { type ReactNode } from 'react';
import cx from 'classnames';

import { Links } from '@/ui/molecules';
import { type LinkProps } from '@/ui/atoms';

export type NavBarProps = {
	links: LinkProps<string>[];
	children?: ReactNode;
};

export const NavBar = ({
	links,
	className,
	children,
	...props
}: NavBarProps & { className?: string }) => (
	<div
		className={cx('sticky left-0 top-0 z-10 w-full overflow-hidden backdrop-blur-md', className)}
		{...props}
	>
		<div className="flex w-full flex-wrap items-center border-b border-gray-200/90 bg-white/90 py-2 lg:py-4 dark:border-gray-900/90 dark:bg-neutral-950/90">
			<div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 md:px-8 lg:flex-row lg:px-16 xl:px-24">
				<nav className="-mx-4 w-screen overflow-x-auto px-4 lg:mx-0 lg:w-auto lg:px-0">
					<Links links={links} className="flex-nowrap" />
				</nav>
				<div className="-order-1 mb-4 self-end lg:order-9 lg:mb-0 lg:ml-auto">{children}</div>
			</div>
		</div>
	</div>
);
