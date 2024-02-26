import cx from 'classnames';

import { type LinkType } from '@/types/link.type';
import { Links } from '@/ui/molecules/Links/Links';

export type NavBarProps<T extends string> = {
	menu: LinkType<T>[];
	submenu?: LinkType<T>[];
};

export const NavBar = <T extends string>({
	menu,
	submenu,
	className,
	...props
}: NavBarProps<T> & { className?: string }) => (
	<nav
		className={cx(
			'sticky left-0 top-0 z-10 w-full shadow-md shadow-black/5 backdrop-blur-md',
			className,
		)}
		{...props}
	>
		<Links
			links={menu}
			className="flex w-full flex-wrap items-center justify-center border-b border-gray-200/90 bg-gray-100/90 py-2 lg:py-4 dark:border-gray-950/90 dark:bg-neutral-800/90"
		/>
		{submenu && submenu?.length > 0 && (
			<Links
				links={submenu}
				className="flex w-full flex-wrap items-center justify-center border-b border-gray-200/90 bg-gray-50/90 py-2 lg:py-4 dark:border-gray-950/90 dark:bg-neutral-900/90"
			/>
		)}
	</nav>
);
