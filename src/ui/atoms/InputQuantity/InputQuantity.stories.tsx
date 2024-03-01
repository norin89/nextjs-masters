import type { Meta, StoryObj } from '@storybook/react';

import { InputQuantity } from './InputQuantity';

const meta: Meta<typeof InputQuantity> = {
	title: 'Atoms / InputQuantity',
	component: InputQuantity,
};

export default meta;
type Story = StoryObj<typeof InputQuantity>;

export const Default: Story = {
	args: {
		quantity: 1,
	},
};

export const WithMinMax: Story = {
	args: {
		quantity: 11,
		minQuantity: 1,
		maxQuantity: 10,
	},
};
