'use client';

import { useFormStatus } from 'react-dom';
import { Trash as IconTrash } from 'lucide-react';

import { Button } from '@/ui/atoms';

export function RemoveFromCartButton() {
	const status = useFormStatus();

	return (
		<Button
			type="submit"
			variant="tertiary"
			icon={IconTrash}
			disabled={status.pending}
			isPending={status.pending}
			title="Remove from cart"
			data-testid="remove-from-cart-button"
		>
			{''}
		</Button>
	);
}
