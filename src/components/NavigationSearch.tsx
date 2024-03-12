'use client';

import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

import { SEARCH_DEBOUNCE_TIME, SEARCH_QUERY_MIN_LENGTH } from '@/config';
import { Input } from '@/ui/atoms';

export function NavigationSearch(props: {}) {
	const searchParams = useSearchParams();
	const URLQuery = searchParams.get('query')?.toString();
	const router = useRouter();

	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, SEARCH_DEBOUNCE_TIME);

	const showResults = (q: string) => {
		router.replace(`/search?query=${encodeURI(q)}`);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		showResults(query);
	};

	useEffect(() => {
		if (debouncedQuery.length >= SEARCH_QUERY_MIN_LENGTH) {
			showResults(debouncedQuery);
		}
	}, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<form onSubmit={handleSubmit} className="relative flex flex-1 flex-shrink-0" {...props}>
			<Input
				name="search"
				type="search"
				placeholder="Search"
				defaultValue={URLQuery}
				onChange={handleChange}
				minLength={SEARCH_QUERY_MIN_LENGTH}
				isRequired
			/>
		</form>
	);
}
