import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

import { compilerOptions } from '../tsconfig.json';

const normalizePath = (p: string): string => p.split('/*').shift() || '';

const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|mjs|ts|tsx))'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'@storybook/themes',
	],
	docs: {
		autodocs: true,
	},
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	webpackFinal: async (config) => {
		if (typeof config.resolve === 'undefined') return config;

		config.resolve.alias = {
			...config.resolve.alias,
			...Object.entries(compilerOptions.paths).reduce(
				(aliases, [key, paths]) => ({
					...aliases,
					...paths.reduce(
						(result, p) => ({
							...result,
							[normalizePath(key)]: [path.resolve(__dirname, '../', normalizePath(p))],
						}),
						{},
					),
				}),
				{},
			),
		};

		return config;
	},
};

export default config;
