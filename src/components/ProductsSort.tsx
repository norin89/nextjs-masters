'use client';

import { type ChangeEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import cx from 'classnames';

export const ProductsSort = ({ ...props }: { className?: string }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentSort = searchParams.get('sort');

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const params = new URLSearchParams(searchParams.toString());
		const sort = e.target.value;

		if (!sort) {
			params.delete('sort');
		} else {
			params.set('sort', e.target.value);
		}

		router.replace(`?${params.toString()}`);
	};

	return (
		<div {...props} className={cx('mb-4 flex justify-end', props.className)}>
			<select
				className="rounded-md border border-gray-200 bg-white px-1 py-2.5 text-black dark:border-neutral-600 dark:bg-black dark:text-white"
				defaultValue={currentSort || ''}
				onChange={handleSortChange}
			>
				<option value="">Default order</option>
				<option value="price_asc">Price: from lowest</option>
				<option value="price_desc">Price: from highest</option>
			</select>
		</div>
	);
};
