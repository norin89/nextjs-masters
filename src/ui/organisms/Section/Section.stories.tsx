import type { Meta, StoryObj } from '@storybook/react';

import { Section } from './Section';

const meta: Meta<typeof Section> = {
	title: 'Organisms / Section',
	component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
	args: {
		children: 'Section content',
		isOdd: false,
	},
};

export const Odd: Story = {
	args: {
		...Default.args,
		isOdd: true,
	},
};
