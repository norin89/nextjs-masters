import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms / Button',
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Primary button',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary button',
		variant: 'secondary',
	},
};

export const Add: Story = {
	args: {
		children: 'Add button',
		variant: 'add',
	},
};

export const Remove: Story = {
	args: {
		children: 'Remove button',
		variant: 'remove',
	},
};

export const Pending: Story = {
	args: {
		children: 'Pending button',
		isPending: true,
	},
};

export const WithIcon: Story = {
	args: {
		children: 'With icon',
		icon: (props) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
				<path d="M12 9v4" />
				<path d="M12 17h.01" />
			</svg>
		),
	},
};

export const AsAnchor: Story = {
	args: {
		as: 'a',
		href: 'https://www.google.com',
		target: '_blank',
		children: 'As link ("a") element',
	},
};
