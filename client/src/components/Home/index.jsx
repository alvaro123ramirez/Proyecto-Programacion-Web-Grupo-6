import React, { useEffect } from 'react';
import Product from './Product';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductProvider';

const Home = () => {
	const { categories, products, loadCategories, loadProducts } = useProducts();

	useEffect(() => {
		loadCategories();
		loadProducts();
	}, []);

	return (
		<div>
			<div className="home">
				<h2 style={{ textAlign: 'center' }}>Disfruta black friday</h2>
				{categories.length
					? categories.map((category) => {
							const hasProducts = products.filter((product) => product.category.id === category.id);
							return hasProducts && hasProducts.length ? (
								<>
									<h2 className="category-title">{category.name}</h2>
									<Row key={category.id} className="category">
										{hasProducts.map((product) => (
											<Col key={product.id}>
												<Link to={`/product-details/${product.documentId}`}>
													<Product product={product} />
												</Link>
											</Col>
										))}
									</Row>
								</>
							) : null;
					  })
					: null}
			</div>
		</div>
	);
};

export default Home;
