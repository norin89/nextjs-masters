import cx from 'classnames';
import NextLink from 'next/link';
import { Suspense } from 'react';
import { Header, Section } from '@/ui/organisms';
import { Title } from '@/ui/atoms';
import { getCollections } from '@/api/products';
import { RelatedProducts } from '@/components/RelatedProducts';

export default async function HomePage() {
	const collections = await getCollections();

	return (
		<>
			<Section className="text-center">
				<Title level={1}>
					<span className="opacity-30">Collections:</span>
				</Title>
				{collections.map((collection, idx) => (
					<Title
						level={2}
						size={1}
						key={collection.slug}
						className={cx('my-8', idx % 2 ? 'md:ml-8 lg:ml-12' : 'md:-ml-8 lg:-ml-12')}
					>
						<NextLink
							href={`/collections/${collection.slug}`}
							className="text-current transition-colors duration-500 hover:text-pink-500"
						>
							{`${collection.name}`}
						</NextLink>
					</Title>
				))}
			</Section>
			<Section isOdd>
				<Header title="Popular products" />
				<Suspense fallback={<span aria-busy="true" />}>
					{/* TODO: Show most popular products not random */}
					<RelatedProducts data-testid="products-list" />
				</Suspense>
			</Section>
		</>
	);
}
