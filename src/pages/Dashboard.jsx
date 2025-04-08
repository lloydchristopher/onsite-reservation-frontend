"use client";

import { useState, useEffect } from "react";
import api from "../api/axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const Dashboard = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const response = await api.get("/api/desks");
				setData(response.data);
			} catch (err) {
				setError("Failed to fetch dashboard data");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
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
			<h1 className="mb-4">Dashboard</h1>

			<Row>
				<Col md={4} className="mb-4">
					<Card>
						<Card.Body>
							<Card.Title>Summary</Card.Title>
							<Card.Text className="text-muted">
								Dashboard content will appear here.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col md={4} className="mb-4">
					<Card>
						<Card.Body>
							<Card.Title>Recent Activity</Card.Title>
							<Card.Text className="text-muted">
								Your recent activities will appear here.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col md={4} className="mb-4">
					<Card>
						<Card.Body>
							<Card.Title>Statistics</Card.Title>
							<Card.Text className="text-muted">
								Your statistics will appear here.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
