import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { InputRating } from './InputRating';

const meta: Meta<typeof InputRating> = {
	title: 'Atoms / InputRating',
	component: InputRating,
};

export default meta;
type Story = StoryObj<typeof InputRating>;

export const Default: Story = {
	args: {
		name: 'rating',
		placeholder: 'Rating',
		defaultValue: 3,
		onChange: fn(),
	},
};
