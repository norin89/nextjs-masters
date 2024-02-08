import type { Meta, StoryObj } from '@storybook/react';

import { ProductBox, type ProductBoxProps } from './ProductBox';

const meta: Meta<typeof ProductBox> = {
	title: 'Atoms / ProductBox',
	component: ProductBox,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 360 }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ProductBox>;

const defaultArgs: ProductBoxProps = {
	product: {
		id: '1',
		name: 'Product name',
		category: 'category',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		price: {
			value: 9900,
			currency: 'USD',
		},
		image: {
			src: 'https://picsum.photos/seed/1/300/300',
			alt: 'Product image',
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
