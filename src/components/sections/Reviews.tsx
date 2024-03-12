import { type ProductFragment } from '@/gql/graphql';
import { getReviewsByProductId } from '@/api/reviews';
import { ProductReviews } from '@/components/ProductReviews';
import { Card } from '@/ui/molecules';
import { Button, Input, InputRating, Title } from '@/ui/atoms';
import { addReviewAction } from '@/actions/reviews';

export async function SectionReviews({ productId }: { productId: ProductFragment['id'] }) {
	const reviews = (await getReviewsByProductId(productId))?.reverse() || [];

	return (
		<div className="align-center grid grid-flow-row-dense grid-cols-3 gap-4">
			{/* TODO: Calculate top */}
			<div className="col-span-3 lg:sticky lg:top-[90px] lg:col-span-1 lg:self-start">
				<Card className="mb-8">
					<div className="mb-4">
						<Title level={3}>Share your thoughts</Title>
						<p className="py-2">
							If you’ve used this product, share your thoughts with other customers
						</p>
					</div>
					<form action={addReviewAction}>
						<input type="hidden" name="productId" value={productId} />
						<div className="mb-4">
							<InputRating name="rating" placeholder="Your rating:" isRequired />
						</div>
						<div className="mb-2">
							<Input name="headline" type="text" placeholder="Review title" isRequired />
						</div>
						<div className="mb-2">
							<Input name="content" type="textarea" placeholder="Content" isRequired />
						</div>
						<div className="mb-2">
							<Input name="name" type="text" placeholder="Your name" isRequired />
						</div>
						<div className="mb-2">
							<Input name="email" type="email" placeholder="Email" isRequired />
						</div>
						<Button variant="primary" type="submit" className="mt-4">
							Add your review
						</Button>
					</form>
				</Card>
			</div>
			<div className="col-span-3 lg:col-span-2 lg:p-4">
				{reviews.length > 0 ? <ProductReviews reviews={reviews} /> : <p>No reviews yet...</p>}
			</div>
		</div>
	);
}
