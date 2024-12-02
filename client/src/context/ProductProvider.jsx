import { useContext, useState } from 'react';
import { getProductsRequest, getCategoriesRequest, getProductRequest } from '../api/product.api';
import { ProductContext } from './productContext';

export const useProducts = () => {
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error('sdadsa');
	}
	return context;
};

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	const [categories, setCategories] = useState([]);

	const loadCategories = async () => {
		const response = await getCategoriesRequest();
		setCategories(response);
	};

	async function loadProducts() {
		const response = await getProductsRequest();
		setProducts(response);
	}

	const getProduct = async (id) => {
		try {
			const response = await getProductRequest(id);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProductContext.Provider value={{ products, categories, loadProducts, loadCategories, getProduct }}>
			{children}
		</ProductContext.Provider>
	);
};
