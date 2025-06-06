import { useState } from 'react';
import { useTodos } from '../../context/TodoContext';

export const TodoForm = () => {
	const [text, setText] = useState('');
	const { addTodo } = useTodos();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim()) {
			addTodo(text);
			setText('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Add a new todo..."
			/>
			<button type="submit">Add</button>
		</form>
	);
};
