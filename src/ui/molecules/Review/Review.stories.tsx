import type { Meta, StoryObj } from '@storybook/react';

import { Review } from './Review';

const meta: Meta<typeof Review> = {
	title: 'Molecules / Review',
	component: Review,
};

export default meta;
type Story = StoryObj<typeof Review>;

export const Default: Story = {
	args: {
		date: new Date('2024-03-06T18:06:53'),
		author: 'John Doe',
		rating: 3,
		title: 'Review title',
		children: 'Content of the review...',
	},
};
