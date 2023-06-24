import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/material/Button";
import { useAuth } from "@lib/authorize";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";

function NavbarDashboard() {
	const auth = useAuth();
	const navigate = useNavigate();
	function signOut() {
		navigate("/");
		auth.logout();
	}

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="light"
			data-bs-theme="light"
			className="bg-body-tertiary"
		>
			<Container>
				<Navbar.Brand>Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="justify-content-end align-items-center w-100">
						<Nav.Item>
							<Avatar sx={{ bgcolor: blue[500] }} aria-label="user">
								{auth.getUser()[0]}
							</Avatar>
						</Nav.Item>
						<Nav.Item>
							<Button className="m-1" onClick={signOut} variant="contained">
								Sign Out
							</Button>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarDashboard;
