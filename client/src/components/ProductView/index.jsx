import { Container, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

const createMarkup = (text) => {
	return { __html: text };
};

const ProductView = () => {
	const [product, setProducts] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState('');

	const handleSizeChange = (event) => {
		setSelectedSize(event.target.value);
	};

	const handleAddToCart = () => {
		if (selectedSize) {
			// Preparar el producto con el tamaño y la cantidad seleccionada
			const productToAdd = {
				...product,
				size: selectedSize,
				quantity,
			};
			addToCart(productToAdd); // Llamada a la función para agregar al carrito
		} else {
			alert('Please select a size');
		}
	};

	const fetchProduct = async () => {
		const id = window.location.pathname.split('/')[2];
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/products/${id}?populate=*`);
			setProducts(data.data);
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	console.log(product);

	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		const loadProduct = async () => {
			const id = window.location.pathname.split('/');
			console.log(id[2]);
			if (id) {
				const product = await getProduct(id[2]);
				setProducts(product);
			}
		};
		loadProduct();
	}, []);

	console.log(product);

	const handleQuantity = (param) => {
		if (param === 'decries' && quantity > 1) {
			setQuantity(quantity - 1);
		}
		if (param === 'increase' && quantity < 10) {
			setQuantity(quantity + 1);
		}
	};
	const renderSizes = () => {
		if (product && product.sizes && product.sizes.length > 0) {
			return (
				<FormControl fullWidth>
					<InputLabel id="size-select-label">Selecciona la talla</InputLabel>
					<Select labelId="size-select-label" value={selectedSize} onChange={handleSizeChange} label="Select Size">
						{product.sizes.map((size) => (
							<MenuItem key={size.name} value={size.name}>
								{size.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		} else {
			return <Typography variant="h5">No sizes</Typography>;
		}
	};

	const renderImages = () => {
		if (product && product.image && product.image.length > 0) {
			return (
				<Carousel>
					{product.image.map((img, i) => {
						const imageUrl = `${import.meta.env.VITE_URL}${img.url}`;
						const backgroundStyle = {
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							height: '400px',
						};

						return <Grid key={i} item xs={12} md={8} className="image-wrappers" style={backgroundStyle}></Grid>;
					})}
				</Carousel>
			);
		} else {
			return <Typography variant="h5">No imagenes</Typography>;
		}
	};

	return (
		<Container className="product-view">
			<br />
			<div className="container-padre-details-producto">
				<Grid item xs={12} md={8} className="image-wrappers">
					<Grid item xs={12} md={8} className="image-wrappers">
						{renderImages()}
					</Grid>
				</Grid>
				<Grid item xs={12} md={4} className="container-detalle-producto">
					<Typography variant="h2">{product?.name}</Typography>
					<Typography variant="h4">{product?.description}</Typography>
					<br />
					<Typography variant="h4">Precio: {product?.price}</Typography>
					<Grid className="container-cantidad-producto">
						<Grid item xs={8} className="container-disminuir-producto">
							<Button
								size="small"
								color="secondary"
								variant="contained"
								onClick={() => {
									handleQuantity('decries');
								}}
							>
								-
							</Button>
						</Grid>
						<Grid item xs={8} className="container-cantidad">
							<Typography className="quantity" variant="h4">
								{quantity}
							</Typography>
						</Grid>
						<Grid item xs={8} className="container-aumentar-producto">
							<Button
								size="small"
								color="secondary"
								variant="contained"
								onClick={() => {
									handleQuantity('increase');
								}}
							>
								+
							</Button>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						{renderSizes()}
						<Grid>
							<br />

							<Button onClick={handleAddToCart} className='container-boton-agregar-carrito'>
								Agregar al carrito
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</Container>
	);
};

export default ProductView;
