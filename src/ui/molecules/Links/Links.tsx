'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';

import { Link } from '@/ui/atoms';
import { type LinkType } from '@/types/link.type';

export type LinksProps = {
	links: LinkType<string>[];
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
					<li key={link.href.toString()}>
						<Link link={{ ...link, isActive }} aria-current={isActive ? 'page' : undefined} />
					</li>
				);
			})}
		</ul>
	);
};
