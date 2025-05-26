import styles from '../../styles/components/ui.module.css';

export const Loader = ({ size = 'medium' }) => {
	const sizeClasses = {
		small: styles.loaderSmall,
		medium: styles.loaderMedium,
		large: styles.loaderLarge
	};

	return (
		<div className={`${styles.loader} ${sizeClasses[size]}`}>
			<div className={styles.loaderSpinner}></div>
			<span className={styles.loaderText}>Loading...</span>
		</div>
	);
};
