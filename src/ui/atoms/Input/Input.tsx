import type { ChangeEventHandler } from 'react';
import cx from 'classnames';
import { Search as IconSearch } from 'lucide-react';

export interface InputProps {
	name: HTMLInputElement['name'];
	id?: HTMLInputElement['id'];
	type: 'text' | 'search' | 'email' | 'number' | 'textarea';
	placeholder: string;
	defaultValue?: string;
	minLength?: number;
	isRequired?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const Input = ({
	id,
	name,
	type,
	placeholder,
	minLength,
	defaultValue,
	isRequired,
	onChange,
	className,
	...props
}: InputProps & { className?: string }) => {
	const Component = type === 'textarea' ? 'textarea' : 'input';

	return (
		<div className={cx('relative flex flex-1 flex-shrink-0', className)} {...props}>
			{id && (
				<label htmlFor={id} className="sr-only">
					{placeholder}
				</label>
			)}
			<Component
				className={cx(
					'peer block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-2 placeholder:text-gray-500 dark:border-neutral-600 dark:bg-black dark:text-white',
					{
						'pl-9': type === 'search',
					},
				)}
				id={id}
				name={name}
				type={type != 'textarea' ? type : undefined}
				placeholder={placeholder}
				onChange={onChange}
				defaultValue={defaultValue}
				minLength={minLength}
				required={isRequired}
			/>
			{type === 'search' && (
				<IconSearch
					size={24}
					className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-white"
				/>
			)}
		</div>
	);
};
