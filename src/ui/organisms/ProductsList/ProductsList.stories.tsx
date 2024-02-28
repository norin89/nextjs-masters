import type { Meta, StoryObj } from '@storybook/react';

import { defaultArgs as productDefaultArgs } from '../../molecules/ProductsBox/ProductBox.stories';
import { ProductsList, type ProductsListProps } from './ProductsList';

const meta: Meta<typeof ProductsList> = {
	title: 'Organisms / ProductsList',
	component: ProductsList,
};

export default meta;
type Story = StoryObj<typeof ProductsList>;

const defaultArgs: ProductsListProps = {
	products: [
		productDefaultArgs.product,
		{
			id: '2',
			name: 'Second product',
			categories: [{ name: 'category' }],
			price: 81900,
			images: [{ url: 'https://prd.place/400?padding=20&id=2' }],
		},
		{
			id: '3',
			name: 'Another product with rather pretty long name',
			categories: [{ name: 'other category' }],
			price: 167500,
			images: [{ url: 'https://prd.place/400?padding=20&id=3' }],
		},
		{
			id: '4',
			name: 'The last one',
			categories: [{ name: 'category' }],
			price: 99,
			images: [{ url: 'https://prd.place/400?padding=20&id=4' }],
		},
	],
};

export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
