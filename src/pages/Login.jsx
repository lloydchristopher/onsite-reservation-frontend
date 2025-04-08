"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Alert,
	Card,
} from "react-bootstrap";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const success = await login({ username, password });
			if (!success) {
				setError("Invalid username or password");
			}
		} catch (err) {
			setError("An error occurred during login");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={6} lg={5} xl={4}>
					<Card className="shadow">
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<h2>Sign In</h2>
								<p className="text-muted">
									Sign in to your account
								</p>
							</div>

							{error && <Alert variant="danger">{error}</Alert>}

							<Form onSubmit={handleSubmit}>
								<Form.Group
									className="mb-3"
									controlId="username"
								>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter username"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
										required
									/>
								</Form.Group>

								<Form.Group
									className="mb-4"
									controlId="password"
								>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="w-100"
									disabled={isLoading}
								>
									{isLoading ? "Signing in..." : "Sign In"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
