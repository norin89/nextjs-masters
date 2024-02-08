import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './Title';

const meta: Meta<typeof Title> = {
	title: 'Atoms / Title',
	component: Title,
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Level1: Story = {
	args: {
		children: 'Title level 1',
		level: 1,
	},
};

export const Level2: Story = {
	args: {
		children: 'Title level 2',
		level: 2,
	},
};

export const Level3: Story = {
	args: {
		children: 'Title level 3',
		level: 3,
	},
};

export const Level4: Story = {
	args: {
		children: 'Title level 4',
		level: 4,
	},
};

export const Level5: Story = {
	args: {
		children: 'Title level 5',
		level: 5,
	},
};
