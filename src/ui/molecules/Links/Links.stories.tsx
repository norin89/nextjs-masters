import type { Meta, StoryObj } from '@storybook/react';

import { Links } from './Links';

const meta: Meta<typeof Links> = {
	title: 'Molecules / Links',
	component: Links,
};

export default meta;
type Story = StoryObj<typeof Links>;

export const Default: Story = {
	args: {
		links: [
			{
				children: 'Home',
				href: '/',
			},
			{
				children: 'Second link',
				href: '#second-link',
			},
			{
				children: 'Some other',
				href: '#some-other',
			},
		],
	},
};
