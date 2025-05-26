// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { useNavigate, Link } from "react-router-dom";

// export const Login = () => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");
// 	const navigate = useNavigate();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await signInWithEmailAndPassword(auth, email, password);
// 			navigate("/");
// 		} catch (err) {
// 			setError(err.message);
// 		}
// 	};

// 	return (
// 		<div className="auth-container">
// 			<h2>Login</h2>
// 			{error && <p className="error">{error}</p>}
// 			<form onSubmit={handleSubmit}>
// 				<input
// 					type="email"
// 					placeholder="Email"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					required
// 				/>
// 				<input
// 					type="password"
// 					placeholder="Password"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					required
// 				/>
// 				<button type="submit">Login</button>
// 			</form>
// 			<p className="auth-switch">
// 				Don't have an account? <Link to="/signup">Create Account</Link>
// 			</p>
// 		</div>
// 	);
// };


// Updated login
// =================================
// =================================
// =================================


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FaUser, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import styles from '../../styles/components/auth.module.css';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/todos');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			className={styles.authContainer}
		// initial={{ opacity: 0, y: 20 }}
		// animate={{ opacity: 1, y: 0 }}
		// exit={{ opacity: 0, y: -20 }}
		// transition={{ duration: 0.3 }}
		>
			<div className={styles.authCard}>
				<div className={styles.authHeader}>
					<h2>Welcome Back</h2>
					<p>Please enter your credentials</p>
				</div>

				{error && (
					<motion.div
						className={styles.authError}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
					>
						{error}
					</motion.div>
				)}

				<form onSubmit={handleSubmit} className={styles.authForm}>
					<div className={styles.inputGroup}>
						<FaUser className={styles.inputIcon} />
						<input
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<FaLock className={styles.inputIcon} />
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							minLength="6"
							required
						/>
					</div>

					<button
						type="submit"
						className={styles.primaryButton}
						disabled={loading}
					>
						{loading ? 'Signing In...' : 'Sign In'}
					</button>
				</form>

				{/* <div className={styles.authDivider}>
					<span>OR</span>
				</div>

				<div className={styles.socialAuth}>
					<button type="button" className={styles.socialButton}>
						<FaGoogle /> Continue with Google
					</button>
					<button type="button" className={styles.socialButton}>
						<FaGithub /> Continue with GitHub
					</button>
				</div> */}

				<div className={styles.authFooter}>
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</motion.div>
	);
};
