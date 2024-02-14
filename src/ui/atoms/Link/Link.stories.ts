import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
	title: 'Atoms / Link',
	component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Inactive: Story = {
	args: {
		link: {
			text: 'Inactive link',
			href: '#inactive-link',
			isActive: false,
		},
	},
};

export const Active: Story = {
	args: {
		link: {
			text: 'Active link',
			href: '#active-link',
			isActive: true,
		},
	},
};
