import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

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
		onChange: fn(),
		onBlur: fn(),
		onDecrementClick: fn(),
		onIncrementClick: fn(),
	},
};

export const WithMinMax: Story = {
	args: {
		quantity: 11,
		minQuantity: 1,
		maxQuantity: 10,
	},
};
