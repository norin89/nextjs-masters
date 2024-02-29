import type { Meta, StoryObj } from '@storybook/react';

import { Links, type LinksProps } from './Links';

const meta: Meta<typeof Links> = {
	title: 'Molecules / Links',
	component: Links,
	excludeStories: /defaultArgs/,
};

export default meta;
type Story = StoryObj<typeof Links>;

export const defaultArgs: LinksProps = {
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
};
export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
