import type { Meta, StoryObj } from '@storybook/react';

import { Default as DefaultLinks } from '../../molecules/Links/Links.stories';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
	title: 'Organisms / NavBar',
	component: NavBar,
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
	args: {
		links: DefaultLinks.args?.links,
		children: <i>Optional children is rendered here</i>,
	},
};
