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
				setData(response.data.data);
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
				<Col md={12} className="mb-4">
					<Card>
						<Card.Header>Section A - Coffee</Card.Header>
						<Card.Body>
							<Row>
								{data
									.filter((item) => item.section === "Coffee")
									.sort((a, b) => {
										const numA = Number(
											a.deskId.match(/\d+/)[0]
										);
										const numB = Number(
											b.deskId.match(/\d+/)[0]
										);
										return numA - numB;
									})
									.map((item, index) => (
										<Col
											md={3}
											className="mb-4"
											key={index}
										>
											<Card
												className={
													item.occupied === true
														? "bg-success text-white"
														: ""
												}
											>
												<Card.Header>
													{item.deskId}
												</Card.Header>
												<Card.Body>
													<Card.Title></Card.Title>
												</Card.Body>
											</Card>
										</Col>
									))}
							</Row>
						</Card.Body>
					</Card>
				</Col>

				<Col md={12} className="mb-4">
					<Card>
						<Card.Header>Section B - Tea</Card.Header>
						<Card.Body>
							<Row>
								{data
									.filter((item) => item.section === "Tea")
									.sort((a, b) => {
										const numA = Number(
											a.deskId.match(/\d+/)[0]
										);
										const numB = Number(
											b.deskId.match(/\d+/)[0]
										);
										return numA - numB;
									})
									.map((item, index) => (
										<Col
											md={3}
											className="mb-4"
											key={index}
										>
											<Card>
												<Card.Header>
													{item.deskId}
												</Card.Header>
												<Card.Body>
													<Card.Title></Card.Title>
												</Card.Body>
											</Card>
										</Col>
									))}
							</Row>
						</Card.Body>
					</Card>
				</Col>

				<Col md={12} className="mb-4">
					<Card>
						<Card.Header>Section C - Soda</Card.Header>
						<Card.Body>
							<Row>
								{data
									.filter((item) => item.section === "Soda")
									.sort((a, b) => {
										const numA = Number(
											a.deskId.match(/\d+/)[0]
										);
										const numB = Number(
											b.deskId.match(/\d+/)[0]
										);
										return numA - numB;
									})
									.map((item, index) => (
										<Col
											md={3}
											className="mb-4"
											key={index}
										>
											<Card>
												<Card.Header>
													{item.deskId}
												</Card.Header>
												<Card.Body>
													<Card.Title></Card.Title>
												</Card.Body>
											</Card>
										</Col>
									))}
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
