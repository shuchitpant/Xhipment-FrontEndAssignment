import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { PostContext } from "../utils/context/PostsContext";
import { UserContext } from "../utils/context/UserContext";
import { auth } from "../utils/firebase";
import Image from "next/image";
import Header from "../components/Header";
import SwitchButton from "../components/SwitchButton";
import CardHolder from "../components/CardHolder";
import sendButton from "../assets/images/Send.svg";
import { useRef } from "react";
import CardHolderYou from "../components/CardHolderYou";

export default function DashBoard() {
	const ref = useRef<any>(null);
	const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
	const { createPost, posts } = useContext(PostContext);
	const [isYou, setIsYou] = useState(false);

	const handleSubmit = () => {
		try {
			const content = ref.current.value;

			console.log(content);
			if (content.length === 0) {
				console.log("Empty String is being passed.");
			} else {
				createPost(content, user?.displayName);
			}
		} catch (error) {
		} finally {
			ref.current!.value = "";
		}
		console.log("Hello");

		console.log("after");
	};

	const router = useRouter();

	return (
		<div className=" bg-primary-lessBlack w-screen h-screen overflow-hidden pb-8">
			<Header
				user={user}
				auth={auth}
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
			<SwitchButton
				setIsYou={setIsYou}
				isYou={isYou}
				isAuthenticated={isAuthenticated}
			/>
			<div>
				<div className="flex space-x-4 justify-center items-center mt-20 input-group-outline mb-6 h-[10vh] mx-auto">
					<textarea
						typeof="text"
						className="block px-2 pt-3 w-3/4 md:w-1/3 text-sm text-primary-white bg-transparent rounded-lg border border-primary-orange h-[10vh] placeholder-white font-semibold "
						placeholder="type your message here..."
						ref={ref}
						id="message"
						name="message"
						rows={4}
					></textarea>
					<button
						type="button"
						onClick={handleSubmit}
						className="h-[10vh] w-[13%] md:w-1/12 items-center bg-primary-darkGrey rounded-lg flex justify-center hover:border border-primary-orange ease-in duration-200 hover:scale-105"
					>
						<Image src={sendButton} alt={"Go"} className="h-1/2 w-1/2" />
					</button>
				</div>
			</div>
			{!isYou ? <CardHolder isYou={isYou} /> : <CardHolderYou isYou={isYou} />}
		</div>
	);
}
