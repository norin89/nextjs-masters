import type { Meta, StoryObj } from '@storybook/react';

import { ProductBox } from './ProductBox';

const meta: Meta<typeof ProductBox> = {
	title: 'Molecules / ProductBox',
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

export const Default: Story = {
	args: {
		name: 'Product',
		badge: {
			children: 'badge',
		},
		price: '$54.99',
		image: {
			src: 'https://prd.place/400?padding=20&id=1',
		},
	},
};
