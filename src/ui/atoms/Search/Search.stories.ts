import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './Search';

const meta: Meta<typeof Search> = {
	title: 'Atoms / Search',
	component: Search,
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
	args: {
		id: 'search',
		placeholder: 'Search',
		minLength: 3,
		defaultValue: '',
	},
};
