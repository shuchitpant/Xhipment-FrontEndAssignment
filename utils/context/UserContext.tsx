import React, { createContext, useState, useMemo, useContext } from "react";
import {
	signInWithPopup,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	UserCredential,
	User,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { NextRouter, useRouter } from "next/router";

// export interface userContextInterface {
//     displayName: string;
//     email: string;
// }

// export const UserContext = createConte, xt<userContextInterface | null>(null);

// export const UserProvider= ({ children: React.ReactNode }) => {
//     const [currUser,setCurrUser] = useState(Object);

//     return (
//         <UserContext.Provider value={currUser}>{children}</UserContext.Provider>
//     )
// }

interface UserContextType {
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	user: undefined | User;
	setUser: (user: User) => void;
	login: (router: NextRouter) => void;
}

export const UserContext = createContext<UserContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	user: undefined,
	setUser: () => {},
	login: () => {},
});

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = async (router: NextRouter) => {
		// const router = useRouter();
		try {
			await setPersistence(auth, inMemoryPersistence);
			const googleAuth = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, googleAuth);
			setUser(result.user);
			setIsAuthenticated(true);
			console.log(result.user);
			router.push("/lol");
		} catch (error) {
			console.log("Error - Auth Failed", error);
		}
	};

	const value = useMemo(
		() => ({
			user,
			setUser,
			login,
			setIsAuthenticated,
			isAuthenticated,
		}),
		[user, isAuthenticated]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useAuth = () => {
	const context = useContext(UserContext);
	return context;
};
export default useAuth;
