import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFound = () => {
	return (
		<Container className="py-5 text-center">
			<Row className="justify-content-center">
				<Col md={6}>
					<h1 className="display-1 fw-bold">404</h1>
					<h2 className="mb-3">Page Not Found</h2>
					<p className="text-muted mb-4">
						The page you are looking for doesn't exist or has been
						moved.
					</p>
					<Button as={Link} to="/" variant="primary">
						Go Home
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default NotFound;
