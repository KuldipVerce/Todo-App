import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import PrivateRoute from './components/auth/PrivateRoute';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { TodoPage } from './pages/TodoPage';
import { HomePage } from './pages/HomePage';
import './styles/main.css';

function App() {
	return (
		<Router>
			<AuthProvider>
				<TodoProvider>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/todos" element={
							<PrivateRoute>
								<TodoPage />
							</PrivateRoute>
						} />
					</Routes>
				</TodoProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
