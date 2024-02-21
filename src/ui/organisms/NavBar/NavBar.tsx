import cx from 'classnames';

import { type LinkType } from '@/types/link.type';
import { Links } from '@/ui/molecules/Links/Links';

export type NavBarProps<T extends string> = {
	links: LinkType<T>[];
};

export const NavBar = <T extends string>({
	links,
	className,
	...props
}: NavBarProps<T> & { className?: string }) => (
	<nav
		className={cx(
			'sticky left-0 top-0 z-10 w-full items-center overflow-x-auto bg-white py-2 shadow-md shadow-black/5 lg:flex-wrap lg:justify-start lg:py-4 dark:bg-neutral-900 dark:shadow-black/10',
			className,
		)}
		{...props}
	>
		<div className="flex w-full items-center justify-center px-3">
			<Links links={links} />
		</div>
	</nav>
);
