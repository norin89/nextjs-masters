import { type PriceType } from '@/types/price.type';
export const formatPrice = (price: PriceType) => {
	// TODO: Localization
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: price.currency,
	}).format(price.value / 100);
};
