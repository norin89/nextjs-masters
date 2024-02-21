import cx from 'classnames';

import { ProductBox, type ProductBoxProps } from '@/ui/molecules';
import { Title } from '@/ui/atoms';

export type ProductsListProps = {
	title?: string;
	products: ProductBoxProps['product'][];
};

export const ProductsList = ({
	title,
	products,
	className,
	...props
}: ProductsListProps & { className?: string }) => (
	<div {...props}>
		{title && (
			<Title level={2} className="mb-8 text-center">
				{title}
			</Title>
		)}
		<ul
			className={cx(
				'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-4',
				className,
			)}
		>
			{products.map((product) => (
				<li className="flex" key={product.id}>
					<ProductBox className="grow" product={product} />
				</li>
			))}
		</ul>
	</div>
);
