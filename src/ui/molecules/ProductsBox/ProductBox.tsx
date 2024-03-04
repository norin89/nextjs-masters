import type { ElementType } from 'react';
import cx from 'classnames';

import { Title, Badge, Image, type ImageProps, type BadgeProps } from '@/ui/atoms';
import type { PolymorphicComponentProps } from '@/ui/types';

type ProductBoxBaseProps = {
	image: ImageProps<ElementType>;
	name: string;
	badge?: BadgeProps;
	price?: string;
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
				{badge && <Badge {...badge} />}
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
