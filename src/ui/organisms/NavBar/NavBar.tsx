import cx from 'classnames';

import { type LinkType } from '@/types/link.type';
import { Links } from '@/ui/molecules/Links/Links';

export type NavBarProps = {
	links: LinkType<string>[];
};

export const NavBar = ({ links, className, ...props }: NavBarProps & { className?: string }) => (
	<nav
		className={cx(
			'fixed left-0 top-0 z-10 w-full items-center overflow-x-auto bg-gray-50 py-2 shadow-md shadow-black/5 lg:flex-wrap lg:justify-start lg:py-4 dark:bg-neutral-900 dark:shadow-black/10',
			className,
		)}
		{...props}
	>
		<div className="flex w-full items-center justify-center px-3">
			<Links links={links} />
		</div>
	</nav>
);
