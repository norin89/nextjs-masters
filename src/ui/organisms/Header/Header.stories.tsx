import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta: Meta<typeof Header> = {
	title: 'Organisms / Header',
	component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
	args: {
		suffix: 'Suffix',
		title: 'Header title',
		lead: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt!',
		children: <i>Optional `children` content.</i>,
	},
};
