import type { Meta, StoryObj } from '@storybook/react';

import { InputSearch } from './InputSearch';

const meta: Meta<typeof InputSearch> = {
	title: 'Atoms / InputSearch',
	component: InputSearch,
};

export default meta;
type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
	args: {
		id: 'search',
		placeholder: 'Search',
		minLength: 3,
		defaultValue: '',
	},
};
