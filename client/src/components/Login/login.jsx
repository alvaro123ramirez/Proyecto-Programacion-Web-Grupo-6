import React, { useState } from 'react';
import { Col, Row, Button, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from '../../helpers';

const initialUser = { password: '', identifier: '' };

const Login = () => {
	const [user, setUser] = useState(initialUser);
	const navigate = useNavigate();

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setUser((currentUser) => ({
			...currentUser,
			[name]: value,
		}));
	};

	const handleLogin = async () => {
		const url = `${import.meta.env.VITE_URL}/api/auth/local`;
		try {
			if (user.identifier && user.password) {
				const { data } = await axios.post(url, user);
				if (data.jwt) {
					storeUser(data);
					toast.success('Logged in successfully!', {
						hideProgressBar: true,
					});
					setUser(initialUser);
					navigate('/');
					window.location.reload();
				}
			}
		} catch (error) {
			toast.error(error.message, {
				hideProgressBar: true,
			});
		}
	};

	return (
		<Row className="login">
			<Col sm="12" md={{ size: 4, offset: 4 }}>
				<div>
					<h2 className="title-login">Iniciar Sesion:</h2>
					<FormGroup>
						<label>Correo:</label>
						<Input
							type="email"
							name="identifier"
							value={user.identifier}
							onChange={handleChange}
							placeholder="Ingresa tu correo"
						/>
					</FormGroup>
					<FormGroup>
						<label>Contraseña:</label>
						<Input
							type="password"
							name="password"
							value={user.password}
							onChange={handleChange}
							placeholder="Ingresa tu contraseña"
						/>
					</FormGroup>
					<div className="container-padre-boton-ingresar">
						<Button color="primary" onClick={handleLogin} className="container-boton-ingresar">
							Ingresar
						</Button>
					</div>
					<div className="title-registrar">No tienes una cuenta?</div>
					<div className="container-padre-boton-registrar">
						<Button className="container-boton-registrar">
							<Link to="/registration" className="link-registrar">
								Registrate
							</Link>
						</Button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Login;
