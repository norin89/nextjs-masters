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
	title: 'List of products:',
	products: [
		productDefaultArgs.product,
		{
			id: '2',
			name: 'Second product',
			categories: [{ name: 'category' }],
			description:
				'Dolores nisi rem voluptas. Ad architecto atque deserunt dolor, ea explicabo facilis fuga fugit iusto labore maxime modi mollitia necessitatibus obcaecati odit officia optio pariatur porro qui quibusdam ratione repudiandae vel vero!',
			price: 81900,
			images: [{ url: 'https://prd.place/400?id=2' }],
		},
		{
			id: '3',
			name: 'Another product with rather pretty long name',
			categories: [{ name: 'other category' }],
			description:
				'Atque, consectetur, doloremque, dolorum eum exercitationem fuga fugiat illum labore libero minima mollitia officia quam quos ut voluptates.',
			price: 167500,
			images: [{ url: 'https://prd.place/400?id=3' }],
		},
		{
			id: '4',
			name: 'The last one',
			categories: [{ name: 'category' }],
			description: 'Commodi culpa deleniti eaque expedita.',
			price: 99,
			images: [{ url: 'https://prd.place/400?id=4' }],
		},
	],
};

export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
