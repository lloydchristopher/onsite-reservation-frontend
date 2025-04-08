"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { Spinner } from "react-bootstrap";

const AppRoutes = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	return (
		<Routes>
			{/* Only redirect from login if user exists */}
			<Route
				path="/login"
				element={user ? <Navigate to="/dashboard" /> : <Login />}
			/>

			{/* Protected routes */}
			<Route
				path="/dashboard"
				element={
					user ? (
						<Layout>
							<Dashboard />
						</Layout>
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route
				path="/profile"
				element={
					user ? (
						<Layout>
							<Profile />
						</Layout>
					) : (
						<Navigate to="/login" />
					)
				}
			/>

			{/* Default route */}
			<Route
				path="/"
				element={<Navigate to={user ? "/dashboard" : "/login"} />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
