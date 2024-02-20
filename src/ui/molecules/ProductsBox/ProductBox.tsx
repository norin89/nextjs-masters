import NextLink from 'next/link';
import cx from 'classnames';

import { formatPrice } from '@/utils/formatPrice';
import { type ProductType } from '@/types/product.type';
import { Title } from '@/ui/atoms';

export type ProductBoxProps = {
	product: ProductType;
};

export const ProductBox = ({
	product,
	className,
	...props
}: ProductBoxProps & { className?: string }) => {
	const { name, category, description, price, image } = product;

	return (
		<NextLink
			className={cx(
				'group flex flex-col overflow-hidden rounded-xl bg-white text-black shadow-sm transition-shadow duration-500 hover:shadow-xl dark:bg-gray-900 dark:text-white',
				className,
			)}
			href={`/products/${product.id}`}
			{...props}
		>
			{image && (
				<div className="overflow-hidden">
					<img
						className="aspect-square w-full bg-gray-200 text-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-white dark:bg-gray-800 dark:text-gray-300 dark:group-hover:bg-gray-900"
						src={image.src}
						alt={image.alt || name}
					/>
				</div>
			)}
			<div className="flex grow flex-col items-start p-4">
				<span className="bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-200">
					{category}
				</span>
				<Title level={2} size={5} className="mt-2 text-lg">
					{name}
				</Title>
				{description && (
					<p className="mt-2 text-xs leading-normal text-gray-600 dark:text-gray-300">
						{description}
					</p>
				)}
				<strong className="mt-auto self-end pt-4 text-2xl font-medium text-pink-500">
					{formatPrice(price)}
				</strong>
			</div>
		</NextLink>
	);
};
