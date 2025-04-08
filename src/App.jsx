import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import global CSS
import "./index.css";

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</Router>
	);
}

export default App;
