'use client';

import {
	type ChangeEvent,
	type FocusEvent,
	startTransition,
	useOptimistic,
	useRef,
	useState,
} from 'react';

import { CART_MAX_ITEMS, CART_MIN_ITEMS } from '@/config';
import { type CartItemFragment } from '@/gql/graphql';
import { changeItemQuantityAction, removeItemFromCartAction } from '@/actions/cart';
import { formatPrice } from '@/utils/formatPrice';
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton';
import { InputQuantity } from '@/ui/atoms';

export function QuantityAndPrice({ item }: { item: CartItemFragment }) {
	const formRef = useRef<HTMLFormElement>(null);

	const [stateQuantity, setStateQuantity] = useState<number | null>(item.quantity);
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		item.quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value);

		setStateQuantity(isNaN(newQuantity) ? null : newQuantity);
	};

	const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value);

		if (isNaN(newQuantity)) {
			await changeQuantity(CART_MIN_ITEMS);
		}

		const fixedNewQuantity = Math.max(Math.min(newQuantity, CART_MAX_ITEMS), CART_MIN_ITEMS);
		await changeQuantity(fixedNewQuantity);
	};

	const changeQuantity = async (newQuantity: number) => {
		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		formData.set('quantity', `${newQuantity}`);

		setStateQuantity(newQuantity);
		startTransition(() => {
			setOptimisticQuantity(newQuantity);
		});

		await changeItemQuantityAction(formData);
	};

	return (
		<div className="flex w-full flex-wrap items-center justify-end gap-2 xl:flex-nowrap">
			<form action={changeItemQuantityAction} ref={formRef}>
				<input type="hidden" name="productId" value={item.product.id} />
				<InputQuantity
					quantity={stateQuantity}
					minQuantity={CART_MIN_ITEMS}
					maxQuantity={CART_MAX_ITEMS}
					onChange={handleChange}
					onBlur={handleBlur}
					onDecrementClick={() => changeQuantity(optimisticQuantity - 1)}
					onIncrementClick={() => changeQuantity(optimisticQuantity + 1)}
				/>
			</form>
			<div className="order-first inline-flex w-full grow flex-col text-nowrap text-right xl:order-none">
				<span className="text-2xl">{formatPrice(item.product.price * optimisticQuantity)}</span>
				{optimisticQuantity > 1 && (
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
