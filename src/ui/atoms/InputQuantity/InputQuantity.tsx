import cx from 'classnames';
import type { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import { Minus as IconMinus, Plus as IconPlus } from 'lucide-react';

import { Button } from '@/ui/atoms/Button/Button';

interface InputQuantityProps {
	quantity: number | null;
	minQuantity?: number;
	maxQuantity?: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	onDecrementClick?: MouseEventHandler<HTMLButtonElement>;
	onIncrementClick?: MouseEventHandler<HTMLButtonElement>;
}

/** Quantity input to decrement / increment numeric values.
 * **`value` is not being changed automatically - you have to use `onChange`, `onDecrementClick` and `onIncrementClick` functions! ** */
export const InputQuantity = ({
	quantity,
	minQuantity,
	maxQuantity,
	onChange,
	onBlur,
	onDecrementClick,
	onIncrementClick,
	className,
	...props
}: InputQuantityProps & { className?: string }) => {
	const isMinExceeded = minQuantity && quantity ? quantity <= minQuantity : false;
	const isMaxExceeded = maxQuantity && quantity ? quantity >= maxQuantity : false;

	return (
		<div className={cx('block', className)} {...props}>
			<div className="inline-flex items-center">
				<Button
					className="rounded-r-none"
					type="button"
					variant="tertiary"
					icon={IconMinus}
					title="Decrease quantity"
					disabled={isMinExceeded}
					onClick={onDecrementClick}
					data-testid="decrement"
				>
					{''}
				</Button>
				<input
					name="quantity"
					type="number"
					className="min-h-10 w-14 border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm text-gray-900 [appearance:textfield] invalid:border-red-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					required
					min={minQuantity}
					max={maxQuantity}
					autoComplete="off"
					value={quantity ?? ''}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{/* Hidden span due to predefined tests */}
				<span className="max-w-0 overflow-hidden" data-testid="quantity">
					{quantity ?? ''}
				</span>
				<Button
					className="rounded-l-none"
					type="button"
					variant="tertiary"
					icon={IconPlus}
					title="Increase quantity"
					disabled={isMaxExceeded}
					onClick={onIncrementClick}
					data-testid="increment"
				>
					{''}
				</Button>
			</div>
		</div>
	);
};
