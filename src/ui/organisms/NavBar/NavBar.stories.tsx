import type { Meta, StoryObj } from '@storybook/react';

import { defaultArgs as LinksDefaultArgs } from '../../molecules/Links/Links.stories';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
	title: 'Organisms / NavBar',
	component: NavBar,
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
	args: {
		menu: LinksDefaultArgs.links,
		submenu: [
			{
				children: 'Submenu Link',
				href: '#submenu',
			},
			{
				children: 'Other one',
				href: '#other-one',
			},
		],
		children: <i>Optional children is rendered here</i>,
	},
};
