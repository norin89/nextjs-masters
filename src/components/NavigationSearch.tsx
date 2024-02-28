'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Search } from '@/ui/atoms';

export function NavigationSearch(props: {}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [query, setQuery] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		router.replace(`/search?query=${encodeURI(query)}`);
	};

	return (
		<form onSubmit={handleSubmit} className="relative flex flex-1 flex-shrink-0" {...props}>
			<Search
				placeholder="Search"
				defaultValue={searchParams.get('query')?.toString()}
				onChange={handleChange}
			/>
		</form>
	);
}
