import type { Meta, StoryObj } from '@storybook/react';

import { LinkBox } from './LinkBox';

const meta: Meta<typeof LinkBox> = {
	title: 'Atoms / LinkBox',
	component: LinkBox,
};

export default meta;
type Story = StoryObj<typeof LinkBox>;

export const Primary: Story = {
	args: {
		link: {
			href: 'https://goscicki.eu/',
			text: 'Visit my website',
			isNewWindow: true,
		},
		children: 'Check this out!',
	},
};
