import type { Meta, StoryObj } from '@storybook/react';

import { ReviewsList } from './ReviewsList';
import { Review, type ReviewProps } from '@/ui/molecules';
import { Default as DefaultReview } from '@/ui/molecules/Review/Review.stories';

const meta: Meta<typeof ReviewsList> = {
	title: 'Organisms / ReviewsList',
	component: ReviewsList,
	// @ts-ignore
	subcomponents: { 'ReviewsList.Item': ReviewsList.Item },
	parameters: {
		controls: {
			exclude: ['className'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof ReviewsList>;

export const Default: Story = {
	args: {
		children: (
			<>
				<ReviewsList.Item>
					<Review {...(DefaultReview.args as ReviewProps)} />
				</ReviewsList.Item>
				<ReviewsList.Item>
					<Review author="Another Author" date={new Date('2024-04-03')} rating={5}>
						Another review content...
					</Review>
				</ReviewsList.Item>
				<ReviewsList.Item>
					<Review author="Last One" date={new Date('2024-04-01')} rating={4}>
						Last review content...
					</Review>
				</ReviewsList.Item>
			</>
		),
	},
};
