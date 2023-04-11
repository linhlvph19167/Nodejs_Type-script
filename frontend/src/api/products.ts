import { IProduct } from '../interfaces/products';
import { instance } from './instance';

/* get all */
export const getProducts = () => {
	return instance.get('/products');
};

/* get one */
export const getProduct = (id: string) => {
	return instance.get(`/products/${id}`);
};

/* update */
export const updateProduct = (data: IProduct) => {
	return instance.put(`/products/${data._id}`, data);
};

/* delete */
export const deleteProduct = (id: string) => {
	return instance.delete(`/products/${id}`);
};
