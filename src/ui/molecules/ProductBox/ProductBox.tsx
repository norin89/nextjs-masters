import type { ElementType } from 'react';
import cx from 'classnames';

import { Title, Badge, Image, type ImageProps, type BadgeProps } from '@/ui/atoms';
import type { PolymorphicComponentProps } from '@/ui/types';

type ProductBoxBaseProps = {
	image: ImageProps<ElementType>;
	name: string;
	badge?: BadgeProps;
	price?: string;
	rating?: number;
};

export type ProductBoxProps<C extends ElementType> = PolymorphicComponentProps<
	C,
	ProductBoxBaseProps
>;

const DefaultElement = 'div';

export const ProductBox = <C extends ElementType = typeof DefaultElement>({
	as,
	image,
	name,
	badge,
	price,
	rating,
	className,
	...props
}: ProductBoxProps<C> & { className?: string }) => {
	const Component = as || DefaultElement;

	return (
		<Component
			className={cx(
				'group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 text-black shadow-sm transition-shadow duration-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:text-white',
				className,
			)}
			{...props}
		>
			{image && (
				<div className="overflow-hidden border-b border-gray-200 bg-white p-4 text-gray-600 dark:border-gray-800">
					<Image
						className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
						alt={name}
						{...image}
					/>
				</div>
			)}
			<div className="flex grow flex-col items-start p-4">
				<div className="flex w-full flex-wrap items-center justify-between">
					{badge && <Badge {...badge} />}
					{rating && (
						<span className="text-xs">
							<svg
								className="ml-auto mr-1 inline-block h-4 w-4 align-text-bottom text-yellow-500"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							{rating.toFixed(2)}
						</span>
					)}
				</div>
				<Title level={2} size={5} className="mt-2 text-lg">
					{name}
				</Title>
				<strong className="mt-auto self-end pt-4 text-2xl font-medium text-pink-500">
					{price}
				</strong>
			</div>
		</Component>
	);
};
