import type { ElementType } from 'react';
import cx from 'classnames';

import { Link, type LinkProps } from '@/ui/atoms';

export type LinksProps = {
	links: LinkProps<ElementType>[];
	/** If `true` only **exact** links will be marked as active */
	isExact?: boolean;
};

export const Links = ({ links, className, ...props }: LinksProps & { className?: string }) => {
	return (
		<ul className={cx('flex flex-wrap gap-3', className)} {...props}>
			{links.map((link) => (
				<li key={JSON.stringify(link.href)}>
					<Link {...link} />
				</li>
			))}
		</ul>
	);
};
