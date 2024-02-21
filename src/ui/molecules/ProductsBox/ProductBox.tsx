import NextLink from 'next/link';
import cx from 'classnames';

import { formatPrice } from '@/utils/formatPrice';
import { type ProductType } from '@/types/product.type';
import { Title } from '@/ui/atoms';

export type ProductBoxProps = {
	product: Pick<ProductType, 'id' | 'title' | 'category' | 'description' | 'price' | 'image'>;
};

export const ProductBox = ({
	product,
	className,
	...props
}: ProductBoxProps & { className?: string }) => {
	const { title, category, description, price, image } = product;

	return (
		<NextLink
			className={cx(
				'group flex flex-col overflow-hidden rounded-xl bg-gray-50 text-black shadow-sm transition-shadow duration-500 hover:shadow-xl dark:bg-gray-900 dark:text-white',
				className,
			)}
			href={`/products/${product.id}`}
			{...props}
		>
			{image && (
				<div className="overflow-hidden border-b bg-white p-10 text-gray-600">
					<img
						className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
						src={image}
						alt={title}
					/>
				</div>
			)}
			<div className="flex grow flex-col items-start p-4">
				<span className="bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-200">
					{category}
				</span>
				<Title level={2} size={5} className="mt-2 text-lg">
					{title}
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
