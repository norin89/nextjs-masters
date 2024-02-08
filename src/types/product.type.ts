export type ProductType = {
	id: string;
	name: string;
	/** TODO: Predefine categories */
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
