'use client';

import { useOptimistic } from 'react';
import { Minus as IconMinus, Plus as IconPlus } from 'lucide-react';

import { CART_MAX_ITEMS, CART_MIN_ITEMS } from '@/config';
import { type CartItemFragment } from '@/gql/graphql';
import { changeItemQuantityAction, removeItemFromCartAction } from '@/actions/cart';
import { formatPrice } from '@/utils/formatPrice';
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton';
import { Button } from '@/ui/atoms';

export function QuantityInput({ item }: { item: CartItemFragment }) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		item.quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<div className="flex w-full flex-wrap items-center justify-end gap-2 xl:flex-nowrap">
			<form className="inline-flex items-center">
				<input type="hidden" name="productId" value={item.product.id} />
				<Button
					className="rounded-r-none"
					type="submit"
					variant="tertiary"
					icon={IconMinus}
					title="Decrease quantity"
					disabled={optimisticQuantity <= CART_MIN_ITEMS}
					formAction={async (formData: FormData) => {
						setOptimisticQuantity(optimisticQuantity - 1);
						formData.set('quantity', `${optimisticQuantity - 1}`);
						await changeItemQuantityAction(formData);
					}}
				>
					{''}
				</Button>
				<input
					name="quantity"
					type="number"
					className="min-h-10 w-14 border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm text-gray-900 [appearance:textfield] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					value={optimisticQuantity}
					autoComplete="off"
					required
					readOnly
					min={CART_MIN_ITEMS}
					max={CART_MAX_ITEMS}
				/>
				<Button
					className="rounded-l-none"
					type="submit"
					variant="tertiary"
					icon={IconPlus}
					title="Increase quantity"
					disabled={optimisticQuantity >= CART_MAX_ITEMS}
					formAction={async (formData: FormData) => {
						setOptimisticQuantity(optimisticQuantity + 1);
						formData.set('quantity', `${optimisticQuantity + 1}`);
						await changeItemQuantityAction(formData);
					}}
				>
					{''}
				</Button>
			</form>
			<div className="order-first inline-flex w-full grow flex-col text-nowrap text-right xl:order-none">
				<span className="text-2xl">{formatPrice(item.product.price * optimisticQuantity)}</span>
				{item.quantity > 1 && (
					<span className="text-sm opacity-65">
						{'per item '}
						{formatPrice(item.product.price)}
					</span>
				)}
			</div>
			<form action={removeItemFromCartAction}>
				<input type="hidden" name="productId" value={item.product.id} />
				<RemoveFromCartButton />
			</form>
		</div>
	);
}
