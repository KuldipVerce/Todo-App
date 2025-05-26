import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) {
			setTodos([]);
			setLoading(false);
			return;
		}

		const q = query(
			collection(db, 'todos'),
			where('userId', '==', currentUser.uid)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const todosData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setTodos(todosData);
			setLoading(false);
		});

		return unsubscribe;
	}, [currentUser]);

	const addTodo = async (text) => {
		await addDoc(collection(db, 'todos'), {
			text,
			completed: false,
			createdAt: new Date(),
			userId: currentUser.uid
		});
	};

	const toggleTodo = async (id, completed) => {
		await updateDoc(doc(db, 'todos', id), {
			completed: !completed
		});
	};

	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, 'todos', id));
	};

	// Add to the existing context value
	const value = {
		todos,
		loading,
		addTodo,
		toggleTodo,
		deleteTodo,
		// Add these new functions:
		updateTodo: async (id, newText) => {
			await updateDoc(doc(db, 'todos', id), {
				text: newText,
				updatedAt: new Date() // Add timestamp for edits
			});
		},
		filteredTodos: (filterType) => {
			switch (filterType) {
				case 'active':
					return todos.filter(todo => !todo.completed);
				case 'completed':
					return todos.filter(todo => todo.completed);
				default:
					return todos;
			}
		}
	};

	return (
		<TodoContext.Provider value={value}>
			{children}
		</TodoContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => useContext(TodoContext);
