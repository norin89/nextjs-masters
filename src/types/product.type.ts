export type ProductType = {
	id: string;
	name: string;
	category: string;
	description?: string;
	price: {
		value: number;
		currency: string;
	};
	image?: {
		src: string;
		alt?: string;
	};
};
