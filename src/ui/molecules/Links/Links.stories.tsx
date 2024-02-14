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
			text: 'Home',
			href: '/',
		},
		{
			text: 'Second link',
			href: '#second-link',
		},
		{
			text: 'Some other',
			href: '#some-other',
		},
	],
};
export const Default: Story = {
	args: {
		...defaultArgs,
	},
};
