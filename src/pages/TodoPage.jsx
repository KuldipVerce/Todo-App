// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { TodoForm } from '../components/todo/TodoForm';
// import { TodoList } from '../components/todo/TodoList';
// import { TodoFilter } from '../components/todo/TodoFilter';
// import { Button } from '../components/ui/Button';
// import styles from '../styles/TodoPage.module.css';

// export const TodoPage = () => {
// 	const { currentUser, logout } = useAuth();
// 	const [activeFilter, setActiveFilter] = useState('all');

// 	return (
// 		<div className={styles.container}>
// 			<header className={styles.header}>
// 				<h1>My Todo App</h1>
// 				<div className={styles.userInfo}>
// 					<span>Hello, {currentUser?.email}</span>
// 					<Button onClick={logout} variant="outline">
// 						Logout
// 					</Button>
// 				</div>
// 			</header>

// 			<main className={styles.mainContent}>
// 				<TodoForm />

// 				<TodoFilter
// 					activeFilter={activeFilter}
// 					setActiveFilter={setActiveFilter}
// 				/>

// 				<TodoList filter={activeFilter} />
// 			</main>

// 			<footer className={styles.footer}>
// 				<p>Double-click to edit todos</p>
// 				<p>Created with React & Firebase</p>
// 			</footer>
// 		</div>
// 	);
// };


// updated

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import { TodoForm, TodoList, TodoFilter } from '../components/todo';
import { TodoForm } from '../components/todo/TodoForm';
import { TodoList } from '../components/todo/TodoList';
import { TodoFilter } from '../components/todo/TodoFilter';
import { FiLogOut, FiUser, FiPlus } from 'react-icons/fi';
import styles from '../styles/TodoPage.module.css';

export const TodoPage = () => {
	const { currentUser, logout } = useAuth();
	const [activeFilter, setActiveFilter] = useState('all');
	const [mobileFormVisible, setMobileFormVisible] = useState(false);

	return (
		<div className={styles.container}>
			{/* Header */}
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<h1>My Tasks</h1>
					<div className={styles.userControls}>
						<span className={styles.userEmail}>
							<FiUser />
							{currentUser?.email}
						</span>
						<button onClick={logout} className={styles.logoutButton}>
							<FiLogOut /> <span className={styles.logoutText}>Logout</span>
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className={styles.mainContent}>
				{/* Mobile Add Button (only shows on small screens) */}
				<button
					className={styles.mobileAddButton}
					onClick={() => setMobileFormVisible(!mobileFormVisible)}
				>
					<FiPlus />
				</button>

				{/* Todo Form (hidden on mobile when not active) */}
				<div className={`${styles.formContainer} ${mobileFormVisible ? styles.formVisible : ''}`}>
					<TodoForm />
				</div>

				{/* Todo Filter */}
				<TodoFilter
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
				/>

				{/* Todo List */}
				<TodoList filter={activeFilter} />
			</main>
		</div>
	);
};
