import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = Props & {
	/** Element / component to be rendered - **must** accept `className` prop.<br />
	 * **Props will be inherited from the passed element.** */
	as?: C;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | keyof Props>;

export type PolymorphicComponentPropsWithRef<
	C extends ElementType,
	Props = {},
> = PolymorphicComponentProps<C, Props> & { ref?: ComponentPropsWithRef<C>['ref'] };
