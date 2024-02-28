import type { Meta, StoryObj } from '@storybook/react';

import { ProductBox, type ProductBoxProps } from './ProductBox';

const meta: Meta<typeof ProductBox> = {
	title: 'Molecules / ProductsBox',
	component: ProductBox,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 360 }}>
				<Story />
			</div>
		),
	],
	excludeStories: /defaultArgs/,
};

export default meta;
type Story = StoryObj<typeof ProductBox>;

export const defaultArgs: ProductBoxProps = {
	product: {
		id: '1',
		name: 'Product',
		categories: [{ name: 'category' }],
		price: 5499,
		images: [
			{
				url: 'https://prd.place/400?padding=20&id=1',
			},
		],
	},
};

export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
