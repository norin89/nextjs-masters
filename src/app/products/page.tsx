import { redirect } from 'next/navigation';

export default async function ProductsPage() {
	redirect('/products/1');
	return null;
}
