import { ProductBox, type ProductBoxProps } from '@/ui/molecules';

export type ProductsListProps = {
	products: ProductBoxProps['product'][];
};

export const ProductsList = ({
	products,
	className,
	...props
}: ProductsListProps & { className?: string }) => (
	<div className={className} {...props}>
		<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
			{products.map((product) => (
				<li className="flex" key={product.id}>
					<ProductBox className="grow" product={product} />
				</li>
			))}
		</ul>
	</div>
);
