import { type ReactElement, type ReactNode } from 'react';
import cx from 'classnames';

export type ReviewsListProps = {
	/** `<ReviewsList.Item>`s with `<Review>` component inside. */
	children: ReactNode;
};

const ReviewsListRoot = ({
	children,
	className,
	...props
}: ReviewsListProps & { className?: string }) => (
	<div {...props} className={className}>
		{children}
	</div>
);

export type ReviewsListItemProps = {
	/** Single `<Review>` component inside. */
	children: ReactElement;
};
export const ReviewsListItem = ({
	children,
	...props
}: ReviewsListItemProps & { [_key: string]: unknown }) => (
	<div
		{...props}
		className={cx(
			'my-4 border-b border-slate-300 py-4 first:mt-0 first:pt-0 last:mb-0 last:border-b-0 last:pb-0',
			props.className ?? undefined,
		)}
	>
		{children}
	</div>
);

type ReviewsList = typeof ReviewsListRoot & {
	Item: typeof ReviewsListItem;
};

export const ReviewsList = ReviewsListRoot as ReviewsList;
ReviewsList.Item = ReviewsListItem;
