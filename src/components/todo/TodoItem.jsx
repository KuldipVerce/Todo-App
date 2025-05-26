import { useState } from 'react';
import { FaCheck, FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { useTodos } from '../../context/TodoContext';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import styles from '../../styles/components/todo.module.css';

export const TodoItem = ({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const [showConfirm, setShowConfirm] = useState(false);
	const { toggleTodo, deleteTodo, updateTodo } = useTodos();

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		if (editText.trim() && editText !== todo.text) {
			await updateTodo(todo.id, editText);
		}
		setIsEditing(false);
	};

	const handleDelete = async () => {
		setShowConfirm(false);
		await deleteTodo(todo.id);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			setEditText(todo.text);
			setIsEditing(false);
		}
	};

	return (
		<>
			<li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
				{isEditing ? (
					<form className={styles.editForm} onSubmit={handleEditSubmit}>
						<input
							type="text"
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
							onKeyDown={handleKeyDown}
							autoFocus
						/>
						<button
							type="submit"
							className={styles.saveBtn}
							aria-label="Save changes"
						>
							<FaSave />
						</button>
						<button
							type="button"
							className={styles.cancelBtn}
							onClick={() => {
								setEditText(todo.text);
								setIsEditing(false);
							}}
							aria-label="Cancel editing"
						>
							<FaTimes />
						</button>
					</form>
				) : (
					<div className={styles.todoContent}>
						<button
							className={styles.toggleBtn}
							onClick={() => toggleTodo(todo.id, todo.completed)}
							aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
						>
							<FaCheck color={todo.completed ? 'var(--success)' : 'var(--gray)'} />
						</button>
						<span
							className={styles.todoText}
							onDoubleClick={() => setIsEditing(true)}
						>
							{todo.text}
						</span>
						<div className={styles.todoActions}>
							<button
								className={styles.editBtn}
								onClick={() => setIsEditing(true)}
								aria-label="Edit todo"
							>
								<FaEdit />
							</button>
							{/* <button
								className={styles.deleteBtn}
								onClick={() => deleteTodo(todo.id)}
								aria-label="Delete todo"
							>
								<FaTrash />
							</button> */}
						</div>
					</div>
				)}

				{/* Update the delete button to show confirmation */}
				<button
					className={styles.deleteBtn}
					onClick={() => setShowConfirm(true)}
					aria-label="Delete todo"
				>
					<FaTrash />
				</button>
			</li>
			{showConfirm && (
				<ConfirmationDialog
					message="Are you sure you want to delete this todo?"
					onConfirm={handleDelete}
					onCancel={() => setShowConfirm(false)}
				/>
			)}
		</>
	);
};
