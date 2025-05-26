import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null); // Reset user state
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const value = {
		currentUser,
		loading,
		logout
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
