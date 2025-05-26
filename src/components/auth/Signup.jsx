// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase/config';
// import { useNavigate, Link } from 'react-router-dom';

// export const Signup = () => {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [error, setError] = useState('');
// 	const navigate = useNavigate();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await createUserWithEmailAndPassword(auth, email, password);
// 			navigate('/todos');
// 		} catch (err) {
// 			setError(err.message);
// 		}
// 	};

// 	return (
// 		<div className="auth-container">
// 			<h2>Sign Up</h2>
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
// 					placeholder="Password (min 6 characters)"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					minLength="6"
// 					required
// 				/>
// 				<button type="submit">Create Account</button>
// 			</form>
// 			<p className="auth-switch">
// 				Already have an account? <Link to="/login">Login</Link>
// 			</p>
// 		</div>
// 	);
// };


// Updated SignUp
// =================================
// =================================
// =================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FaGoogle, FaGithub, FaLock, FaEnvelope } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import styles from '../../styles/components/auth.module.css';

export const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		setLoading(true);
		setError('');

		try {
			await createUserWithEmailAndPassword(auth, email, password);
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
		// // exit={{ opacity: 0, y: -20 }}
		// transition={{ duration: 0.3 }}
		>
			<div className={styles.authCard}>
				<div className={styles.authHeader}>
					<h2>Create Account</h2>
					<p>Get started with your free account</p>
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
						<FaEnvelope className={styles.inputIcon} />
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
							placeholder="Password (min 6 characters)"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							minLength="6"
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<FaLock className={styles.inputIcon} />
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							minLength="6"
							required
						/>
					</div>

					<button
						type="submit"
						className={styles.primaryButton}
						disabled={loading}
					>
						{loading ? 'Creating Account...' : 'Sign Up'}
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
					Already have an account? <Link to="/login">Sign In</Link>
				</div>
			</div>
		</motion.div>
	);
};
