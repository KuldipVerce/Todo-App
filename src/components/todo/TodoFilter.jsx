export const TodoFilter = ({ activeFilter, setActiveFilter }) => {
	// Remove local state since we're using props now
	const filterOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'completed', label: 'Completed' }
	];

	return (
		<div className="todo-filter">
			{filterOptions.map((option) => (
				<button
					key={option.value}
					className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
					onClick={() => setActiveFilter(option.value)}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
