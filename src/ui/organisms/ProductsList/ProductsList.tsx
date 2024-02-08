import cx from 'classnames';

import { type ProductType } from '@/types/product.type';
import { ProductBox } from '@/ui/molecules';
import { Title } from '@/ui/atoms';

export type ProductsListProps = {
	title?: string;
	products: ProductType[];
};

export const ProductsList = ({
	title,
	products,
	className,
}: ProductsListProps & { className?: string }) => (
	<div>
		{title && (
			<Title level={1} className="mb-8 text-center">
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