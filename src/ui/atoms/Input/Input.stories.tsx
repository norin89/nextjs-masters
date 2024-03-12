import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'Atoms / Input',
	component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		id: 'inputId',
		name: 'inputId',
		placeholder: 'Placeholder',
		minLength: 3,
		defaultValue: '',
		onChange: fn(),
	},
};
