import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/HomePage.module.css';

export const HomePage = () => {
	const { currentUser } = useAuth();

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Welcome to Your Todo App</h1>
				<p className={styles.subtitle}>Organize your life, one task at a time</p>
			</header>

			<main className={styles.mainContent}>
				<div className={styles.features}>
					<div className={styles.featureCard}>
						<h3>✓ Simple</h3>
						<p>Clean interface that focuses on what matters</p>
					</div>
					<div className={styles.featureCard}>
						<h3>✓ Secure</h3>
						<p>Protected with Firebase Authentication</p>
					</div>
					<div className={styles.featureCard}>
						<h3>✓ Accessible</h3>
						<p>Designed for everyone to use easily</p>
					</div>
				</div>

				<div className={styles.cta}>
					{currentUser ? (
						<Link to="/todos" className={styles.primaryButton}>
							Go to Your Todos
						</Link>
					) : (
						<>
							<Link to="/login" className={styles.primaryButton}>
								Login
							</Link>
							<Link to="/signup" className={styles.secondaryButton}>
								Create Account
							</Link>
						</>
					)}
				</div>
			</main>

			<footer className={styles.footer}>
				<p>Built with React & Firebase</p>
			</footer>
		</div>
	);
};
