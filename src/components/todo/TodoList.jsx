import { useTodos } from '../../context/TodoContext';
import { TodoItem } from './TodoItem';
import { Loader } from '../ui/Loader';
import styles from '../../styles/components/todo.module.css';

export const TodoList = ({ filter }) => {
	const { filteredTodos, loading } = useTodos();

	if (loading) return <Loader />;

	const todosToShow = filteredTodos(filter);

	return (
		<ul className={styles.todoList}>
			{todosToShow.length > 0 ? (
				todosToShow.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
					/>
				))
			) : (
				<p className={styles.emptyMessage}>
					{filter === 'all'
						? 'No todos yet. Add one above!'
						: `No ${filter} todos found`}
				</p>
			)}
		</ul>
	);
};
