import type { ReactNode } from 'react';
import cx from 'classnames';
import { Title } from '@/ui/atoms';

export type HeaderProps = {
	suffix?: string;
	title: string;
	lead?: string;
	children?: ReactNode;
};

export const Header = ({
	suffix,
	title,
	lead,
	children,
	className,
	...props
}: HeaderProps & { className?: string }) => (
	<header className={cx('mb-8 text-center md:mb-12 lg:mb-16 xl:mb-24', className)} {...props}>
		<Title level={1}>
			{suffix && <span className="opacity-25">{suffix} / </span>}
			{title}
		</Title>
		{lead && <p className="mt-4 text-lg">{lead}</p>}
		{children && <div className="mt-8">{children}</div>}
	</header>
);
