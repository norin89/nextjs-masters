'use client';

import { type RefObject, useCallback, useEffect, useState } from 'react';

function getScrollParent(node: HTMLElement | null) {
	if (node == null) {
		return null;
	}

	if (node.scrollHeight > node.clientHeight) {
		return node;
	} else {
		return getScrollParent(node.parentElement);
	}
}

/** Returns `isStuck` boolean to determine if `sticky` element is currently stuck. */
export function useStuck<T extends HTMLElement>(
	stickyRef: RefObject<T>,
	isInitiallySticky = false,
) {
	const [isStuck, setIsStuck] = useState(isInitiallySticky);
	const [originalTop, setOriginalTop] = useState(0);
	const [top, setTop] = useState(0);

	const getParentTop = useCallback(() => {
		if (!stickyRef.current) return 0;
		const scrollingParent = getScrollParent(stickyRef.current);
		return scrollingParent?.getBoundingClientRect().top || 0;
	}, [stickyRef]);

	const getTop = useCallback(() => {
		if (!stickyRef.current) return 0;
		return Math.round(stickyRef.current.getBoundingClientRect().top - getParentTop());
	}, [stickyRef, getParentTop]);

	const updateStickiness = useCallback(
		(newTop: number) => {
			setTop(newTop);
			setIsStuck(newTop !== originalTop);
		},
		[originalTop],
	);

	const updateOriginalTop = useCallback(() => {
		if (!stickyRef.current) return;

		stickyRef.current.style.position = 'static';

		const top = getTop();
		setOriginalTop(top);

		stickyRef.current.style.position = '';
	}, [stickyRef, getTop]);

	useEffect(() => {
		let waitingOnAnimRequest = false;

		const observe = () => {
			if (!waitingOnAnimRequest) {
				window.requestAnimationFrame(() => {
					updateStickiness(getTop());
					waitingOnAnimRequest = false;
				});
				waitingOnAnimRequest = true;
			}
		};

		updateOriginalTop();
		observe();

		window.addEventListener('resize', updateOriginalTop);
		window.addEventListener('orientationchange', updateOriginalTop);
		document.addEventListener('scroll', observe);

		return () => {
			window.removeEventListener('resize', updateOriginalTop);
			window.removeEventListener('orientationchange', updateOriginalTop);
			document.removeEventListener('scroll', observe);
		};
	}, [getTop, updateOriginalTop, updateStickiness]);

	return [isStuck, top, originalTop] as const;
}
