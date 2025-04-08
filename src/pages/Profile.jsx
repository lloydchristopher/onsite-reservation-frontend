"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "./css/Profile.css";

const Profile = () => {
	const { user } = useAuth();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await api.get("/api/auth/me");
				setProfile(response.data.data);
			} catch (err) {
				setError("Failed to fetch profile data");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	if (loading) {
		return (
			<div className="text-center py-5">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="danger" className="m-3">
				{error}
			</Alert>
		);
	}

	return (
		<Container>
			<h1 className="mb-4">Profile</h1>
			{console.log(profile)}
			<Card className="mb-4">
				<Card.Body>
					<div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 mb-4">
						<div className="profile-avatar">
							{profile?.username?.charAt(0).toUpperCase() || (
								<i className="bi bi-person"></i>
							)}
						</div>

						<div>
							<h4>
								{profile?.username ||
									user?.data.username ||
									"User"}
							</h4>
							<p className="text-muted mb-1">
								{profile?.email || "email@example.com"}
							</p>
							<p className="text-muted">
								{user?.data.role?.replace("ROLE_", "") ||
									"Role"}
							</p>
						</div>
					</div>

					<hr />

					<h5 className="mb-3">Profile Information</h5>

					<Row>
						<Col md={6} className="mb-3">
							<p className="text-muted mb-1">Full Name</p>
							<p>
								{profile?.firstName + " " + profile?.lastName ||
									"Not provided"}
							</p>
						</Col>

						<Col md={6} className="mb-3">
							<p className="text-muted mb-1">Email</p>
							<p>{profile?.email || "Not provided"}</p>
						</Col>

						<Col md={6} className="mb-3">
							<p className="text-muted mb-1">Assigned Desk</p>
							<p>{profile?.deskId || "Not assigned"}</p>
						</Col>

						<Col md={6} className="mb-3">
							<p className="text-muted mb-1">Department</p>
							<p>{profile?.departmentName || "Not provided"}</p>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Profile;
