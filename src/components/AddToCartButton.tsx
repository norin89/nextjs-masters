'use client';

import { useFormStatus } from 'react-dom';
import { Plus as IconPlus } from 'lucide-react';

import { Button } from '@/ui/atoms';

export function AddToCartButton() {
	const status = useFormStatus();

	return (
		<Button
			type="submit"
			variant="add"
			icon={IconPlus}
			disabled={status.pending}
			isPending={status.pending}
			data-testid="add-to-cart-button"
		>
			Add to cart
		</Button>
	);
}
