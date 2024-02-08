import cx from 'classnames';

import { formatPrice } from '@/utils/formatPrice';
import { type ProductType } from '@/types/product.type';

export type ProductBoxProps = {
	product: ProductType;
};

export const ProductBox = ({ product, className }: ProductBoxProps & { className?: string }) => (
	<div className={cx('block overflow-hidden rounded-xl bg-white dark:bg-gray-800', className)}>
		{product.image && (
			<img
				className="aspect-square w-full bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
				src={product.image.src}
				alt={product.image.alt || product.name}
			/>
		)}
		<div className="p-4">
			<span className="bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-200">
				{product.category}
			</span>
			<h2 className="mt-2 text-lg font-semibold dark:text-white">{product.name}</h2>
			{product.description && (
				<p className="mt-1 text-xs leading-normal text-gray-600 dark:text-gray-200">
					{product.description}
				</p>
			)}
			<strong className="mt-4 block text-right text-2xl font-medium text-pink-500">
				{formatPrice(product.price)}
			</strong>
		</div>
	</div>
);
