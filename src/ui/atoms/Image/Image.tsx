import cx from 'classnames';
import type { ElementType } from 'react';

import { type PolymorphicComponentProps } from '@/ui/types';

type ImageBaseProps = {
	src: string;
	alt?: string;
};

export type ImageProps<C extends ElementType> = PolymorphicComponentProps<C, ImageBaseProps>;

const DefaultElement = 'img';

/** Polymorphic image component - in `as` prop can be passed component to be rendered -
 * e.g. `Image` component from frameworks like `Next` or `Gatsby`.  */
export const Image = <C extends ElementType = typeof DefaultElement>({
	as,
	src,
	alt,
	className,
	...props
}: ImageProps<C> & { className?: string }) => {
	const Component = as || DefaultElement;

	return (
		<Component className={cx('block w-full', className)} {...props} src={src} alt={alt || ''} />
	);
};
