import PropTypes from 'prop-types';
import styles from '../../styles/components/ui.module.css';

export const Button = ({
	children,
	onClick,
	type = 'button',
	variant = 'primary',
	disabled = false,
	ariaLabel,
	className = ''
}) => {
	return (
		<button
			type={type}
			className={`${styles.btn} ${styles[variant]} ${className}`}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	variant: PropTypes.oneOf(['primary', 'outline', 'danger', 'success']),
	disabled: PropTypes.bool,
	ariaLabel: PropTypes.string,
	className: PropTypes.string
};
