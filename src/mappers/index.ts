import type { Route } from 'next';
import NextLink from 'next/link';

import { type ProductFragment } from '@/gql/graphql';
import { formatPrice } from '@/utils/formatPrice';
import { type ProductBoxProps } from '@/ui/molecules';

export const mapProductToProductBoxProps = (
	product: ProductFragment,
): ProductBoxProps<typeof NextLink> => ({
	as: NextLink,
	href: `/product/${product.id}` as Route,
	name: product.name,
	image: {
		src: product.images[0]!.url,
	},
	badge: product.categories[0] && { children: product.categories[0].name },
	price: formatPrice(product.price),
});
