import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "@lib/authorize";

function NavbarDefault() {
	const auth = useAuth();
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="light"
			data-bs-theme="light"
			className="bg-body-tertiary"
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					Recipe App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="justify-content-end w-100">
						<Nav.Link as={Link} to={`${auth.getIsLoggedIn() === 'true' ? "/dashboard" : "/login"}`}>
							Login
						</Nav.Link>
						<Nav.Link as={Link} to="/register">
							Register
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarDefault;
