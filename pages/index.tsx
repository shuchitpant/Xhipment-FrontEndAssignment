import Image from "next/image";
import Logo1 from "../assets/images/MindLine.svg";
import Tagline from "../assets/images/tagline.svg";
import Group12 from "../assets/images/Group12.png";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../utils/context/UserContext";

export default function Home() {
	const router = useRouter();

	const { login, user } = useContext(UserContext);

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
				</div>
			</div>
		</div>
	);
}
