import { Fragment, type ChangeEventHandler } from 'react';
import cx from 'classnames';

export interface InputRatingProps {
	name: HTMLInputElement['name'];
	/** Used as prefix, for `rating` will create `id="rating-1" to `id="rating-5` for each radio input. */
	id?: HTMLInputElement['name'];
	placeholder?: string;
	defaultValue?: 1 | 2 | 3 | 4 | 5;
	minLength?: number;
	isRequired?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputRating = ({
	name,
	id = 'rating',
	placeholder,
	defaultValue,
	isRequired,
	className,
	...props
}: InputRatingProps & { className?: string }) => (
	<div className={cx('relative', className)} {...props}>
		{placeholder && <strong className="mr-2 font-medium">{placeholder}</strong>}
		<div className="my-1 flex flex-row-reverse items-center justify-end space-x-1 text-gray-300 dark:text-gray-500">
			{Array.from({ length: 5 }).map((_, idx) => {
				const rating = 5 - idx;
				return (
					<Fragment key={`${id}-${rating}`}>
						<input
							type="radio"
							id={`${id}-${rating}`}
							name={name}
							value={rating}
							defaultChecked={defaultValue === rating}
							required={isRequired}
							className="sr-only [&:checked~label]:text-yellow-500 [&:hover~label]:text-yellow-500"
						/>
						<label htmlFor={`${id}-${rating}`} className="flex cursor-pointer items-center">
							<svg
								key={`rating-${idx}`}
								className="h-8 w-8"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
						</label>
					</Fragment>
				);
			})}
		</div>
	</div>
);
