import { ImageResponse } from 'next/og';
import { getProductById } from '@/api/products';
import { formatPrice } from '@/utils/formatPrice';

export const runtime = 'edge';

export const alt = 'About Acme';
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		return null;
	}

	return new ImageResponse(
		(
			<div
				style={{
					position: 'relative',
					background: 'white',
					width: size.width,
					height: size.height,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 30,
					padding: 15,
				}}
			>
				<span
					style={{
						position: 'absolute',
						top: 15,
						right: 15,
						padding: '.25em .5em',
						background: '#ddd',
						color: '#333',
						fontSize: 24,
					}}
				>
					{product.categories[0]?.name || ''}
				</span>
				{product.images[0] && (
					<img
						src={product.images[0].url}
						alt={product.name}
						style={{
							width: size.width / 2,
							height: size.width / 2,
						}}
					/>
				)}
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						flexDirection: 'column',
						flexGrow: 1,
						flexShrink: 1,
						paddingRight: 15,
					}}
				>
					<h1 style={{ margin: 0, fontSize: 48 }}>{product.name}</h1>
					<p style={{ margin: 0, fontSize: 96, color: 'rgb(236 72 153)' }}>
						{formatPrice(product.price)}
					</p>
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
