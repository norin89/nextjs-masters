import { ProductsList } from '@/ui/organisms';

export default function Home() {
	return (
		<main className="mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center p-8 md:p-12 lg:p-16 xl:p-24">
			<ProductsList
				title="Our products:"
				products={[
					{
						id: '1',
						name: 'Energy Saving Light Bulbs',
						category: 'accessories',
						description:
							'Illuminate your space efficiently with our Energy Saving Light Bulbs! These eco-friendly bulbs offer bright, long-lasting light while conserving energy and reducing your electricity bills. Upgrade to sustainable lighting today!',
						price: {
							value: 2190,
							currency: 'USD',
						},
						image: {
							src: 'https://prd.place/400?padding=40&id=45',
							alt: 'Product image',
						},
					},
					{
						id: '2',
						name: 'A cup of coffee',
						category: 'food',
						description:
							'Indulge in the rich aroma and bold flavor of our premium cup of coffee. Made from the finest beans, each sip is a delightful experience that awakens your senses. Start your day right with our perfect brew!',
						price: {
							value: 350,
							currency: 'USD',
						},
						image: {
							src: 'https://prd.place/400?padding=40&id=14',
							alt: 'Product image',
						},
					},
					{
						id: '3',
						name: 'Crate of apples',
						category: 'food',
						description:
							'Juicy, crunchy apples to snack on, but keep them away from your coffee mug! Trust us, your stomach will thank you. Happy snacking!',
						price: {
							value: 1299,
							currency: 'USD',
						},
						image: {
							src: 'https://prd.place/400?padding=40&id=22',
							alt: 'Product image',
						},
					},
					{
						id: '4',
						name: 'Scooter',
						category: 'toys',
						description:
							"Get ready for big adventures with our premium Toy Scooter! This matchbox-sized marvel is packed with style and excitement for little ones. But here's the twist: despite its small size, it comes with a premium price tag that mirrors the real deal. So, buckle up and let the fun ride begin!",
						price: {
							value: 809900,
							currency: 'USD',
						},
						image: {
							src: 'https://prd.place/400?padding=40&id=35',
							alt: 'Product image',
						},
					},
				]}
			/>
		</main>
	);
}
