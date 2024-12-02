import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Row, Button, FormGroup, Input } from 'reactstrap';

const initialUser = { email: '', password: '', username: '' };
const Registration = () => {
	const [user, setUser] = useState(initialUser);
	const navigate = useNavigate();

	const signUp = async () => {
		try {
			const url = `${import.meta.env.VITE_URL}/api/auth/local/register`;
			if (user.username && user.email && user.password) {
				const res = await axios.post(url, user);
				if (!!res) {
					toast.success('Registered successfully!', {
						hideProgressBar: true,
					});
					setUser(initialUser);
					navigate('/login');
				}
			}
		} catch (error) {
			toast.error(error.message, {
				hideProgressBar: true,
			});
		}
	};

	const handleUserChange = ({ target }) => {
		const { name, value } = target;
		setUser((currentUser) => ({
			...currentUser,
			[name]: value,
		}));
	};

	return (
		<Row className="register">
			<Col sm="12" md={{ size: 4, offset: 4 }}>
				<div>
					<h2 className="title-pagina-principal-registro">Registrate:</h2>
					<FormGroup>
						<label>Nombre:</label>
						<Input
							type="text"
							name="username"
							value={user.username}
							onChange={handleUserChange}
							placeholder="Ingresa tu nombre completo"
						/>
					</FormGroup>
					<FormGroup>
						<label>Email:</label>
						<Input
							type="email"
							name="email"
							value={user.email}
							onChange={handleUserChange}
							placeholder="Ingresa tu email"
						/>
					</FormGroup>
					<FormGroup>
						<label>Contraseña:</label>
						<Input
							type="password"
							name="password"
							value={user.password}
							onChange={handleUserChange}
							placeholder="Ingresa tu contraseña"
						/>
					</FormGroup>
					<div className="container-padre-boton-registro-principal">
						<Button color="primary" onClick={signUp} className="boton-registro-principal">
							Confirmar
						</Button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Registration;
