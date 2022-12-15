import React, { useContext } from "react";
import Image from "next/image";
import Logo2 from "../assets/images/Logo_PostPage.svg";
import { userAgent } from "next/server";
import { Auth, User } from "firebase/auth";
import { NextPage } from "next";
import { UserContext } from "../utils/context/UserContext";
import { useRouter } from "next/router";
import Logo1 from "../assets/images/MindLine.svg";
import {
	ArrowLeftOnRectangleIcon,
	ArrowRightOnRectangleIcon,
	BeakerIcon,
} from "@heroicons/react/24/solid";

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
		<div className="flex flex-1 justify-between max-w-7xl mx-auto px-4 ">
			<div className="w-9/12 sm:w-full ">
				<Image
					className="hidden sm:flex pt-5 "
					src={Logo2}
					alt="Mindline logo"
				/>
				<Image className="sm:hidden pt-5 " src={Logo1} alt="Mindline logo" />
			</div>
			<div className="flex w-3/12 justify-center items-center space-x-4 mt-7">
				{isAuthenticated ? (
					<div className="hidden lg:inline-block w-1/2 text-primary-white justify-center font-thickboi">
						<p className="">Logged In </p>
						<p>{user?.displayName}</p>
					</div>
				) : (
					""
				)}
				<div className="hidden sm:block">
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
				<div className="sm:hidden">
					{isAuthenticated ? (
						<button
							onClick={async () => {
								await auth.signOut();
								await setIsAuthenticated(false);
							}}
							className="bg-primary-orange text-white p-4 rounded-full text-center "
						>
							<ArrowRightOnRectangleIcon className="h-6 w-6 " />
						</button>
					) : (
						<button
							onClick={() => {
								login(router);
							}}
							className="bg-primary-orange text-white p-2 rounded-full text-center "
						>
							<ArrowLeftOnRectangleIcon className="h-6 w-6 " />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
