import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Container } from 'reactstrap';
import Login from './components/Login/login';
import Registration from './components/Registration/registration';
import Logout from './components/Logout/logout';
import ProductView from './components/ProductView/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductProvider } from './context/ProductProvider';
import CustomNav from './components/CustomNav';
import Footer from './components/CustomFooter/Footer';

function App() {
	return (
		<ProductProvider>
			<BrowserRouter>
				<CustomNav />
				<Container>
					<ToastContainer />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/product-details/:id" element={<ProductView />} />
						<Route path="/registration" element={<Registration />} />
					</Routes>
				</Container>
				<Footer />
			</BrowserRouter>
		</ProductProvider>
	);
}

export default App;
