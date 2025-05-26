import { FaExclamationCircle } from 'react-icons/fa';
import styles from '../../styles/components/ui.module.css';

export const ErrorMessage = ({ message, onRetry, retryText = 'Try Again' }) => {
	return (
		<div className={styles.errorContainer}>
			<FaExclamationCircle className={styles.errorIcon} />
			<p className={styles.errorText}>{message}</p>
			{onRetry && (
				<button
					onClick={onRetry}
					className={styles.errorRetryButton}
				>
					{retryText}
				</button>
			)}
		</div>
	);
};
