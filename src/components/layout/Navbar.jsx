"use client";
import { useAuth } from "../../context/AuthContext";
import {
	Navbar as BootstrapNavbar,
	Container,
	Button,
	Dropdown,
} from "react-bootstrap";
import "./css//Navbar.css";

const Navbar = ({ toggleSidebar }) => {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<BootstrapNavbar className="app-navbar fixed-top shadow-sm">
			<Container fluid>
				{/* Make the toggle button always visible */}
				<Button
					variant="outline-secondary"
					className="navbar-toggle-btn"
					onClick={toggleSidebar}
					aria-label="Toggle sidebar"
				>
					<i className="bi bi-list fs-5"></i>
				</Button>

				<BootstrapNavbar.Brand href="#" className="d-none d-md-block">
					Onsite Reservation
				</BootstrapNavbar.Brand>

				<div className="ms-auto d-flex align-items-center">
					<Dropdown align="end">
						<Dropdown.Toggle
							variant="light"
							id="dropdown-user"
							className="user-dropdown d-flex align-items-center"
						>
							<div className="user-info me-2 d-none d-md-block text-end">
								<div className="fw-bold">
									{user?.data.username || "User"}
								</div>
								<div className="small text-muted">
									{user?.data.role?.replace("ROLE_", "") ||
										"Role"}
								</div>
							</div>
							<div className="user-avatar">
								{user?.data.username
									?.charAt(0)
									.toUpperCase() || (
									<i className="bi bi-person"></i>
								)}
							</div>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="/profile">
								<i className="bi bi-person me-2"></i> Profile
							</Dropdown.Item>
							<Dropdown.Item href="#settings">
								<i className="bi bi-gear me-2"></i> Settings
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout}>
								<i className="bi bi-box-arrow-right me-2"></i>{" "}
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</Container>
		</BootstrapNavbar>
	);
};

export default Navbar;
