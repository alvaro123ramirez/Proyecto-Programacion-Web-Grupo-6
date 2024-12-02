import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const Product = ({ product }) => {
	const image = product.image[0];

	return (
		<Card className="product-card">
			<CardImg top width="100%" src={`${import.meta.env.VITE_URL}${image.url}`} alt={image.name} />
			<CardBody>
				<CardTitle className='container-name-producto-secciones'>{product.name}</CardTitle>
				<CardSubtitle className='container-precio-producto-secciones'>
					<strong>Precio: S/{product.price}</strong>
				</CardSubtitle>
			</CardBody>
		</Card>
	);
};

export default Product;
