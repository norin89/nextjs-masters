'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';

import { Link } from '@/ui/atoms';
import { type LinkType } from '@/types/link.type';

export type LinksProps = {
	links: LinkType<string>[];
};

export const Links = ({ links, className, ...props }: LinksProps & { className?: string }) => {
	const pathname = usePathname();
	const firstNodePathname = `/${pathname.substring(1).split('/').shift()}`;

	return (
		<ul className={cx('flex gap-3', className)} {...props}>
			{links.map((link) => {
				const isActive = firstNodePathname === link.href;

				return (
					<li key={link.href.toString()}>
						<Link link={{ ...link, isActive }} aria-current={isActive ? 'page' : undefined} />
					</li>
				);
			})}
		</ul>
	);
};
