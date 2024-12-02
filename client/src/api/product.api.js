import axios from 'axios';

export const getProductsRequest = async () => {
	try {
		const {
			data: { data },
		} = await axios.get(`${import.meta.env.VITE_URL}/api/products?populate=*`);
		return data;
	} catch (error) {
		console.log('Error en : ', error);
	}
};

export const getCategoriesRequest = async () => {
	try {
		const {
			data: { data },
		} = await axios.get(`${import.meta.env.VITE_URL}/api/categories`);
		return data;
	} catch (error) {
		console.error('Error en:', error);
		throw error;
	}
};

export const getProductRequest = async (id) => {
	try {
		const {
			data: { data },
		} = await axios.get(`${import.meta.env.VITE_URL}/api/products/${id}?populate=*`);
		return data;
	} catch (error) {
		console.error('Error en:', error);
		throw error;
	}
};
