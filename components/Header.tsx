import React, { useContext } from "react";
import Image from "next/image";
import Logo2 from "../assets/images/Logo_PostPage.svg";
import { userAgent } from "next/server";
import { Auth, User } from "firebase/auth";
import { NextPage } from "next";
import { UserContext } from "../utils/context/UserContext";
import { useRouter } from "next/router";

interface Props {
	user: User | undefined;
	auth: Auth;
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Header: NextPage<Props> = (props) => {
	const { user, auth, isAuthenticated, setIsAuthenticated } = props;
	const { login } = useContext(UserContext);
	const router = useRouter();
	return (
		<div className="flex flex-1 justify-between max-w-7xl mx-auto">
			<div className="">
				<Image
					className="hidden sm:flex pt-5 "
					src={Logo2}
					alt="Mindline logo"
				/>
			</div>
			<div className="flex justify-center items-center space-x-4 mt-7">
				{isAuthenticated ? (
					<div className="hidden md:block  text-primary-white justify-center font-thickboi">
						<p>Logged In </p>
						<p>{user?.displayName}</p>
					</div>
				) : (
					""
				)}
				<div>
					{isAuthenticated ? (
						<button
							onClick={async () => {
								await auth.signOut();
								await setIsAuthenticated(false);
							}}
							className="bg-primary-orange hover:bg-blue-700 text-white font-semibold py-3.5 px-10  text-base rounded-2xl text-center "
						>
							Logout
						</button>
					) : (
						<button
							onClick={() => {
								login(router);
							}}
							className="bg-primary-orange hover:bg-blue-700 text-white font-semibold py-3.5 px-10  text-base rounded-2xl text-center "
						>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
