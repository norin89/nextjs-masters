import { Title } from '@/ui/atoms';

export default function ProductPage({ params }: { params: { productId: string } }) {
	const { productId } = params;

	return (
		<div className="align-center flex flex-wrap items-center justify-center">
			<div className="md:w-1/2 xl:w-1/3">
				<img
					src="https://prd.place/400?padding=40&id=45"
					alt="Energy Saving Light Bulbs"
					className="w-full max-w-screen-sm"
				/>
			</div>
			<div className="md:w-1/2 xl:w-2/3">
				<header className="mb-8">
					<span className="text-xs uppercase opacity-50">Product id: {productId}</span>
					<Title level={1}>Energy Saving Light Bulbs</Title>
				</header>
				<p>
					Illuminate your space efficiently with our Energy Saving Light Bulbs! These eco-friendly
					bulbs offer bright, long-lasting light while conserving energy and reducing your
					electricity bills. Upgrade to sustainable lighting today!
				</p>
			</div>
		</div>
	);
}
