export type ProductType = {
	id: string;
	title: string;
	price: number;
	description: string;
	longDescription: string;
	image: string;
	category: string;
	rating?: {
		rate: number;
		count: number;
	};
};
