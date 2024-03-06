import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';

import '../src/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
		},
		options: {
			storySort: {
				order: ['Atoms', 'Molecules', 'Organisms'],
			},
		},
		nextjs: {
			appDirectory: true,
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
