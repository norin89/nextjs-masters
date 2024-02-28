import type { ReactNode } from 'react';
import cx from 'classnames';

import { Title, type TitleProps } from '@/ui/atoms';

export type HeaderProps = {
	suffix?: string;
	title: string;
	level?: TitleProps['level'];
	lead?: string;
	children?: ReactNode;
};

export const Header = ({
	suffix,
	title,
	level = 2,
	lead,
	children,
	className,
	...props
}: HeaderProps & { className?: string }) => (
	<header className={cx('mb-4 text-center md:mb-8 lg:mb-12 xl:mb-16', className)} {...props}>
		<Title level={level}>
			{suffix && <span className="opacity-25">{suffix} / </span>}
			{title}
		</Title>
		{lead && <p className="mt-4 text-lg">{lead}</p>}
		{children && <div className="mt-8">{children}</div>}
	</header>
);
