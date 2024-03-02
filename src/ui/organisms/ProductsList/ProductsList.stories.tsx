import type { Meta, StoryObj } from '@storybook/react';

import { Default as DefaultProductBox } from '../../molecules/ProductsBox/ProductBox.stories';
import { ProductsList } from './ProductsList';

const meta: Meta<typeof ProductsList> = {
	title: 'Organisms / ProductsList',
	component: ProductsList,
};

export default meta;
type Story = StoryObj<typeof ProductsList>;

export const Default: Story = {
	args: {
		products: [
			// @ts-ignore
			DefaultProductBox.args,
			{
				name: 'Second product',
				badge: { children: 'badge' },
				price: '$819.00',
				image: { src: 'https://prd.place/400?padding=20&id=2' },
			},
			{
				name: 'Another product with rather pretty long name',
				badge: { children: 'other badge' },
				price: '$1675.00',
				image: { src: 'https://prd.place/400?padding=20&id=3' },
			},
			{
				name: 'The last one',
				badge: { children: 'another one' },
				price: '$0.99',
				image: { src: 'https://prd.place/400?padding=20&id=4' },
			},
		],
	},
};
