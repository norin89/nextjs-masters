import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		plugin(({ addVariant, theme }) => {
			['2xl', 'xl', 'lg', 'md', 'sm'].forEach((bp) => {
				addVariant(
					`-${bp}`,
					`@media screen and (max-width: ${`${parseInt(theme(`screens.${bp}`)) - 1}px`})`,
				);
			});
		}),
	],
};
export default config;
