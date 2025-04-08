"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./css/Layout.css";

const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="layout-container">
			<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

			<div
				className={`content-wrapper ${
					sidebarOpen ? "sidebar-expanded" : ""
				}`}
			>
				<Navbar toggleSidebar={toggleSidebar} />
				<main className="main-content">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
