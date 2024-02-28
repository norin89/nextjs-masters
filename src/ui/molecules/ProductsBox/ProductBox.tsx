import NextLink from 'next/link';
import NextImage from 'next/image';
import cx from 'classnames';

import { type ProductFragment } from '@/gql/graphql';
import { formatPrice } from '@/utils/formatPrice';
import { Title, Badge } from '@/ui/atoms';

export type ProductBoxProps = {
	product: Omit<ProductFragment, 'description'>;
};

export const ProductBox = ({
	product,
	className,
	...props
}: ProductBoxProps & { className?: string }) => {
	const { name, categories, price, images } = product;

	return (
		<NextLink
			className={cx(
				'group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 text-black shadow-sm transition-shadow duration-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:text-white',
				className,
			)}
			href={`/product/${product.id}`}
			{...props}
		>
			{images[0] && (
				<div className="overflow-hidden border-b border-gray-200 bg-white p-4 text-gray-600 dark:border-gray-800">
					<NextImage
						className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
						src={images[0].url}
						alt={name}
						width={400}
						height={400}
					/>
				</div>
			)}
			<div className="flex grow flex-col items-start p-4">
				{categories[0] && <Badge>{categories[0]?.name}</Badge>}
				<Title level={2} size={5} className="mt-2 text-lg">
					{name}
				</Title>
				<strong className="mt-auto self-end pt-4 text-2xl font-medium text-pink-500">
					{formatPrice(price)}
				</strong>
			</div>
		</NextLink>
	);
};
