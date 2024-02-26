import cx from 'classnames';

export interface BadgeProps {
	/** Badge text */
	children: string;
}

export const Badge = ({ children, className, ...props }: BadgeProps & { className?: string }) => (
	<span
		className={cx(
			'bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-200',
			className,
		)}
		{...props}
	>
		{children}
	</span>
);
