import cx from 'classnames';

import { formatPrice } from '@/utils/formatPrice';
import { type ProductType } from '@/types/product.type';
import { Title } from '@/ui/atoms';

export type ProductBoxProps = {
	product: ProductType;
};

export const ProductBox = ({ product, className }: ProductBoxProps & { className?: string }) => (
	<div
		className={cx(
			'flex flex-col overflow-hidden rounded-xl bg-white text-black dark:bg-gray-900 dark:text-white',
			className,
		)}
	>
		{product.image && (
			<img
				className="aspect-square w-full bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
				src={product.image.src}
				alt={product.image.alt || product.name}
			/>
		)}
		<div className="flex grow flex-col items-start p-4">
			<span className="bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-200">
				{product.category}
			</span>
			<Title level={2} size={5} className="mt-2 text-lg">
				{product.name}
			</Title>
			{product.description && (
				<p className="mt-2 text-xs leading-normal text-gray-600 dark:text-gray-300">
					{product.description}
				</p>
			)}
			<strong className="mt-auto self-end pt-4 text-2xl font-medium text-pink-500">
				{formatPrice(product.price)}
			</strong>
		</div>
	</div>
);
