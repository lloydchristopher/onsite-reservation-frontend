"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is already logged in
		const checkAuthStatus = async () => {
			try {
				const response = await api.get("/api/auth/me");
				setUser(response.data);
			} catch (error) {
				// Don't log errors during initial auth check to avoid console spam
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const login = async (credentials) => {
		try {
			const response = await api.post("/api/auth/login", credentials);
			setUser(response.data);
			navigate("/dashboard");
			return true;
		} catch (error) {
			console.error("Login failed", error);
			return false;
		}
	};

	const logout = async () => {
		try {
			await api.post("/api/auth/logout");
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	const value = {
		user,
		loading,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
