import type { ProductType } from '@/types';

export const getProducts = async () => {
  const res = await fetch('https://naszsklep-api.vercel.app/api/products');
  return (await res.json()) as ProductType[];
};

export const getProductById = async (id: ProductType['id']) => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
  return (await res.json()) as ProductType;
};
