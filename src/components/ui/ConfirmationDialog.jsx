import { useEffect, useRef } from 'react';
import styles from '../../styles/components/ui.module.css';

export const ConfirmationDialog = ({
	message,
	onConfirm,
	onCancel,
}) => {
	const dialogRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onCancel();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onCancel]);

	// Add this useEffect to the ConfirmationDialog component
	useEffect(() => {
		const dialog = dialogRef.current;
		const focusableElements = dialog.querySelectorAll('button');
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTabKey = (e) => {
			if (e.key !== 'Tab') return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		};

		dialog.addEventListener('keydown', handleTabKey);
		return () => dialog.removeEventListener('keydown', handleTabKey);
	}, []);

	return (
		<div className={styles.dialogBackdrop}>
			<div
				ref={dialogRef}
				className={styles.confirmationDialog}
				role="alertdialog"
				aria-labelledby="dialog-title"
				aria-describedby="dialog-message"
			>
				<h3 id="dialog-title">Confirm Deletion</h3>
				<p id="dialog-message">{message}</p>
				<div className={styles.dialogActions}>
					<button
						onClick={onCancel}
						className={`${styles.btn} ${styles.outline}`}
						aria-label="Cancel deletion"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className={`${styles.btn} ${styles.danger}`}
						aria-label="Confirm deletion"
						autoFocus
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
