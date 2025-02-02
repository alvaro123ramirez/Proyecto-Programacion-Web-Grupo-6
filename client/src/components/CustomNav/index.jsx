import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { userData } from '../../helpers';

const CustomNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { jwt, username } = userData();
	const isLoggedIn = !!jwt;

	return (
		<div className="container-encabezado">
			<Navbar light expand="md" className="encabezado">
				<NavbarBrand href="/" className="container-logo">
					<img src="/src/Images/imagen-oeschle.png" alt="" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} className="mr-2" />
				<Collapse isOpen={isOpen} navbar>
					<Nav navbar>
						{isLoggedIn ? (
							<NavItem className="logout-encabezado">
								<p className='title-bienvenido-logout'>Bienvenido {username}</p>
								<NavLink href="/logout" className='container-principal-logout'><img src="/src/Images/imagen-cerrar-sesion.png" alt="" className='container-imagen-logout' /></NavLink>
							</NavItem>
						) : (
							<NavItem>
								<NavLink href="/login">
									<img src="/src/Images/imagen-iniciar-sesion.png" alt="" />
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default CustomNav;
