import { Section } from '@/ui/organisms';
import { Title } from '@/ui/atoms';

export default function HomePage() {
	return (
		<Section>
			<div className="text-center">
				<span className="mb-4 inline-block text-9xl">🛍️</span>
				<Title level={1}>Hello!!!</Title>
			</div>
		</Section>
	);
}
