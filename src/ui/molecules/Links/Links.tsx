'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';

import { Link, type LinkProps } from '@/ui/atoms';

export type LinksProps = {
	links: LinkProps<string>[];
	/** If `true` only **exact** links will be marked as active */
	isExact?: boolean;
};

export const Links = ({
	links,
	isExact = false,
	className,
	...props
}: LinksProps & { className?: string }) => {
	const pathname = usePathname();

	return (
		<ul className={cx('flex gap-3', className)} {...props}>
			{links.map((link) => {
				const isActive = isExact
					? link.href === pathname
					: `${pathname}/`.startsWith(`${link.href as string}/`);

				return (
					<li key={JSON.stringify(link.href)}>
						<Link {...link} isActive={isActive} aria-current={isActive ? 'page' : undefined} />
					</li>
				);
			})}
		</ul>
	);
};
