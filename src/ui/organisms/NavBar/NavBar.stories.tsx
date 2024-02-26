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
				text: 'Submenu Link',
				href: '#submenu',
			},
			{
				text: 'Other one',
				href: '#other-one',
			},
		],
	},
};
