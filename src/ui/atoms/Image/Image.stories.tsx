import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './Image';

const meta: Meta<typeof Image> = {
	title: 'Atoms / Image',
	component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
	args: {
		src: 'https://prd.place/400?padding=20&id=1',
		alt: 'Image alt',
	},
};
