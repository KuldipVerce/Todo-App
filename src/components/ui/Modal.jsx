import { useEffect, useRef } from 'react';
import styles from '../../styles/components/ui.module.css';

export const Modal = ({ title, children, onClose }) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return (
		<div className={styles.modalOverlay}>
			<div
				ref={modalRef}
				className={styles.modal}
				role="dialog"
				aria-labelledby="modal-title"
			>
				<div className={styles.modalHeader}>
					<h2 id="modal-title">{title}</h2>
					<button
						onClick={onClose}
						className={styles.modalCloseButton}
						aria-label="Close modal"
					>
						&times;
					</button>
				</div>
				<div className={styles.modalContent}>
					{children}
				</div>
			</div>
		</div>
	);
};
