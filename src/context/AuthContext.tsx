import React, { createContext, useState, useEffect, useContext } from 'react';
import { IStudent } from '../types/Student';
import { api } from '../lib/axios';

interface AuthContextData {
	user: IStudent | null;
	isAuthenticated: boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<IStudent | null>(null);
	const isAuthenticated = !!user;

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const response = await api.get('students/is-logged');
				const userData = response.data.student;
				setUser(userData);
			} catch (error) {
				setUser(null);
			}
		};
		checkAuthentication();
	}, []);

	const logout = async () => {
		await api.get('students/logout');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
