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
		category: 'category',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		price: {
			value: 5499,
			currency: 'USD',
		},
		image: {
			src: 'https://prd.place/400?padding=40&id=1',
			alt: '',
		},
	},
};

export const Default: Story = {
	args: {
		...defaultArgs,
	},
};

export const NoImage: Story = {
	args: {
		...defaultArgs,
		product: {
			...defaultArgs.product,
			image: undefined,
		},
	},
};
