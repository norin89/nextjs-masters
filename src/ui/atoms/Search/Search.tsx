import type { ChangeEventHandler } from 'react';
import cx from 'classnames';
import { Search as IconSearch } from 'lucide-react';

export interface SearchProps {
	id?: HTMLInputElement['id'];
	placeholder: string;
	defaultValue?: string;
	minLength?: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Search = ({
	id,
	placeholder,
	minLength,
	defaultValue,
	onChange,
	className,
	...props
}: SearchProps & { className?: string }) => (
	<div className={cx('relative flex flex-1 flex-shrink-0', className)} {...props}>
		{id && (
			<label htmlFor={id} className="sr-only">
				{placeholder}
			</label>
		)}
		<input
			id={id}
			type="search"
			className="peer block w-full rounded-md border border-gray-200 bg-white p-2 pl-10 text-sm text-black outline-2 placeholder:text-gray-500 dark:border-neutral-600 dark:bg-black dark:text-white"
			placeholder={placeholder}
			onChange={onChange}
			defaultValue={defaultValue}
			minLength={minLength}
			required
		/>
		<IconSearch
			size={24}
			className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-white"
		/>
	</div>
);
