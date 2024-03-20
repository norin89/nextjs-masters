import cx from 'classnames';

export type ReviewProps = {
	date?: Date;
	author: string;
	rating: 1 | 2 | 3 | 4 | 5;
	title: string;
	/** Description of the review */
	children: string;
};

export const Review = ({
	children,
	author,
	date,
	rating,
	title,
	className,
	...props
}: ReviewProps & { className?: string }) => (
	<div {...props} className={className}>
		<div className="mb-4">
			<p className="text-sm font-semibold">
				{author}
				{date && (
					<time dateTime={date.toISOString()} className="block font-normal opacity-65">
						{/* TODO: Add `dateFormatter` prop to pass function for date formatting */}
						{date.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</time>
				)}
			</p>
			<div className="my-1 flex items-center space-x-1">
				{Array.from({ length: 5 }).map((_, idx) => (
					<svg
						key={`rating-${idx}`}
						className={cx('h-4 w-4', {
							'text-yellow-500': idx + 1 <= rating,
							'text-gray-300 dark:text-gray-500': idx + 1 > rating,
						})}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
					</svg>
				))}
			</div>
		</div>
		<p className="mb-1 font-medium">{title}</p>
		<p className="mb-2 text-gray-500 dark:text-gray-400">{children}</p>
	</div>
);
