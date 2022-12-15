import { auth } from "../utils/firebase";
import Image from "next/image";
import Logo1 from "../assets/images/MindLine.svg";
import bgCircle from "../assets/images/Ellipse 1.svg";
// import BGmain from '../assets/images/backgroundwhole.svg'
import Tagline from "../assets/images/tagline.svg";
import LineArt from "../assets/images/lineart.svg";
import Group12 from "../assets/images/Group12.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../utils/context/UserContext";
import { PostContext } from "../utils/context/PostsContext";

export default function Home() {
	// const context = useContext(UserContext);
	// if(!context){
	//     return null;
	// }
	const router = useRouter();
	// const [user, setUser] = useAuthState(auth);
	const { login, user } = useContext(UserContext);
	// const { readPosts } = useContext(PostContext);
	const handleLogin = () => {
		login(router);
	};
	const handleContinue = () => {
		router.push("/dashboard");
	};
	return (
		<div
			className="bg-primary-grey w-screen h-screen"
			style={{ backgroundImage: `url(${Group12.src})` }}
		>
			<div className="ml-8 sm:ml-16 md:ml-28 lg:ml-40 pt-60">
				<div className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-thin text-white font-thickboi">
					Welcome to
				</div>

				<Image
					className="pt-5 pr-40 lg:pr-0"
					height={400}
					width={400}
					src={Logo1}
					alt="Picture of the author"
				/>
				<Image
					src={Tagline}
					className="pt-5 pr-28 lg:pr-0"
					height={200}
					width={600}
					alt="Picture of the author"
				/>
				<div className="pt-5 space-x-4">
					<button
						onClick={handleLogin}
						className="bg-primary-orange hover:bg-blue-700 text-white font-normal py-2 px-8  lg:py-4 lg:px-12 text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-2xl "
					>
						Login
					</button>

					<button
						className="bg-primary-white hover:bg-primary-orange hover:text-white text-black  font-normal py-2 px-8  lg:py-4 lg:px-12 text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-2xl "
						onClick={handleContinue}
					>
						Continue
					</button>
					{user ? (
						<div className="text-2xl font-thin text-white pt-5">
							Hello, {user.email}
						</div>
					) : (
						""
					)}
					{/* {user ? (
						<button
							onClick={() => auth.signOut()}
							className="bg-primary-orange hover:bg-blue-700 text-white font-normal py-4 px-10  text-3xl rounded-2xl mt-5 "
						>
							Logout
						</button>
					) : (
						""
					)} */}
				</div>
			</div>

			{/* <Image
                src={BGmain}
                className="absolute top-0 right-0 h-screen"
                alt="Picture of the author"
                /> */}

			{/* <Image
                src={bgCircle}
                className="absolute top-0 left-0 h-screen"
                alt="Picture of the author"
                /> */}
		</div>
	);
}
