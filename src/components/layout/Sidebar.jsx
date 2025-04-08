"use client";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Nav, Button } from "react-bootstrap";
import "./css/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const navItems = [
		{ name: "Dashboard", path: "/dashboard", icon: "bi-grid" },
		{ name: "Profile", path: "/profile", icon: "bi-person" },
	];

	const handleNavigation = (path) => {
		navigate(path);
		// Close sidebar on navigation on mobile
		if (window.innerWidth < 768) {
			toggleSidebar();
		}
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<div className={`app-sidebar ${isOpen ? "show" : ""}`}>
				{/* Sidebar header with the same height as navbar */}
				<div className="sidebar-header">
					{/* Add burger icon in sidebar for desktop */}
					<div className="sidebar-title">
						<Button
							variant="link"
							className="sidebar-toggle d-none d-md-block"
							onClick={toggleSidebar}
						>
							<i className="bi bi-list fs-5"></i>
						</Button>
						<h5 className="m-0">My App</h5>
					</div>

					{/* Close button for mobile */}
					<Button
						variant="link"
						className="sidebar-close d-md-none"
						onClick={toggleSidebar}
					>
						<i className="bi bi-x-lg"></i>
					</Button>
				</div>

				<Nav className="sidebar-nav">
					{navItems.map((item) => (
						<Nav.Link
							key={item.path}
							className={
								location.pathname === item.path ? "active" : ""
							}
							onClick={() => handleNavigation(item.path)}
						>
							<i className={`bi ${item.icon} me-2`}></i>
							{item.name}
						</Nav.Link>
					))}

					<Nav.Link onClick={handleLogout}>
						<i className="bi bi-box-arrow-left me-2"></i>
						Logout
					</Nav.Link>
				</Nav>
			</div>

			{/* Backdrop for mobile */}
			{isOpen && (
				<div
					className="sidebar-backdrop d-md-none"
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default Sidebar;
