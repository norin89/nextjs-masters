'use client';

import { useRef } from 'react';
import NextLink from 'next/link';

import cx from 'classnames';
import { formatPrice } from '@/utils/formatPrice';
import { useStuck } from '@/hooks/useStuck';
import { Card } from '@/ui/molecules';
import { Button, Title } from '@/ui/atoms';

export const Summary = ({ totalPrice }: { totalPrice?: number }) => {
	const stickyRef = useRef<HTMLDivElement>(null);
	const [isStuck] = useStuck(stickyRef, true);

	return (
		<div
			// TODO: Calculate top
			className="sticky bottom-0 col-span-3 self-start lg:bottom-auto lg:top-[90px] lg:col-span-1"
			ref={stickyRef}
		>
			<Card
				className={cx('-lg:duration-250 -lg:transition-all', {
					'-lg:-mx-4 -lg:rounded-none -lg:shadow-[0_-8px_12px_-1px_rgba(0,0,0,0.2)]': isStuck,
				})}
			>
				<Title level={2} size={3}>
					Order summary
				</Title>
				{totalPrice && (
					<div className="py-2 md:py-4 xl:py-8">
						{`Total Price: `}
						<div className="inline-block text-2xl text-pink-500 md:text-3xl xl:block xl:text-5xl">
							{formatPrice(totalPrice)}
						</div>
					</div>
				)}
				<hr />
				<p className="my-4 text-sm italic">Shipping will be calculated at the next step.</p>
				<Button as={NextLink} variant="primary" href="/" isBlock>
					Checkout
				</Button>
			</Card>
		</div>
	);
};
