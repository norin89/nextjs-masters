import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';

import '../src/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
			exclude: ['className'],
		},
		options: {
			storySort: {
				order: ['Atoms', 'Molecules', 'Organisms'],
			},
		},
	},
	decorators: [
		(Story) => (
			<div className={inter.className}>
				<Story />
			</div>
		),
	],
};

export default preview;
