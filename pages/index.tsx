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
import useAuth from "../utils/context/UserContext";

export default function lol() {
	// const context = useContext(UserContext);
	// if(!context){
	//     return null;
	// }
	const router = useRouter();
	// const [user, setUser] = useAuthState(auth);
	const { login, user } = useAuth();
	const handleLogin = () => {
		login(router);
	};
	return (
		<div
			className="bg-primary-grey w-screen h-screen"
			style={{ backgroundImage: `url(${Group12.src})` }}
		>
			<div className="ml-40 pt-60">
				<div className="text-7xl font-thin text-white font-thickboi">
					Welcome to
				</div>

				<Image className="pt-5" src={Logo1} alt="Picture of the author" />
				<Image src={Tagline} className="pt-5" alt="Picture of the author" />
				<div className="pt-5">
					<button
						onClick={handleLogin}
						className="bg-primary-orange hover:bg-blue-700 text-white font-normal py-4 px-12  text-3xl rounded-2xl "
					>
						Login
					</button>

					<button className="bg-primary-white hover:bg-primary-orange hover:text-white text-black font-normal py-4 px-8 w-50 text-3xl rounded-2xl ml-4">
						Continue
					</button>
					{user ? (
						<div className="text-2xl font-thin text-white pt-5">
							Hello, {user.email}
						</div>
					) : (
						""
					)}
					{user ? (
						<button
							onClick={() => auth.signOut()}
							className="bg-primary-orange hover:bg-blue-700 text-white font-normal py-4 px-10  text-3xl rounded-2xl mt-5 "
						>
							Logout
						</button>
					) : (
						""
					)}
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
