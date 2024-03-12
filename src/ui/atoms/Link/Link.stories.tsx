import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
	title: 'Atoms / Link',
	component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Inactive: Story = {
	args: {
		children: 'Inactive link',
		href: '#inactive-link',
		isActive: false,
		onClick: fn(),
	},
};

export const Active: Story = {
	args: {
		...Inactive.args,
		children: 'Active link',
		href: '#active-link',
		isActive: true,
	},
};
