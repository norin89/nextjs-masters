'use client';

import { Minus as IconMinus, Plus as IconPlus } from 'lucide-react';

import { type CartItemFragment } from '@/gql/graphql';
import { removeItemFromCartAction } from '@/actions/cart';
import { formatPrice } from '@/utils/formatPrice';
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton';
import { Button } from '@/ui/atoms';

export function QuantityInput({ item }: { item: CartItemFragment }) {
	return (
		<div className="flex w-full flex-wrap items-center justify-end gap-2 xl:flex-nowrap">
			<div className="inline-flex items-center">
				<Button
					variant="tertiary"
					icon={IconMinus}
					title="Decrease quantity"
					className="rounded-r-none"
				>
					{''}
				</Button>
				<input
					type="number"
					className="min-h-10 w-14 border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm text-gray-900 [appearance:textfield] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					defaultValue={item.quantity}
					autoComplete="off"
					required
				/>
				<Button
					variant="tertiary"
					icon={IconPlus}
					title="Increase quantity"
					className="rounded-l-none"
				>
					{''}
				</Button>
			</div>
			<div className="order-first inline-flex w-full grow flex-col text-nowrap text-right xl:order-none">
				<span className="text-2xl">{formatPrice(item.product.price * item.quantity)}</span>
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
