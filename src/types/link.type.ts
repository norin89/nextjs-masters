import type { Route } from 'next';

export type LinkType<T extends string> = {
	text: string;
	href: Route<T> | URL;
	isActive?: boolean;
};
