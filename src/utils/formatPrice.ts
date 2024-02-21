// TODO: Localization
export const formatPrice = (value: number, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
	}).format(value / 100);
};
