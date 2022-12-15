import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { isIfStatement } from "typescript";
import usePost, { PostContext } from "../utils/context/PostsContext";
import { UserContext } from "../utils/context/UserContext";
import { auth, db } from "../utils/firebase";
import Image from "next/image";
import Logo2 from "../assets/images/Logo_PostPage.svg";
import Header from "../components/Header";
import SwitchButton from "../components/SwitchButton";
import TextInput from "../components/TextInput";
import CardHolder from "../components/CardHolder";
import sendButton from "../assets/images/Send.svg";
import { useRef } from "react";
import CardHolderYou from "../components/CardHolderYou";

export default function lol() {
	const ref = useRef<any>(null);
	const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
	const { createPost, posts } = useContext(PostContext);
	const [isYou, setIsYou] = useState(false);
	// const [posts, setPosts] = useState({});
	// useEffect(() => {
	// 	try {
	// 		const q = query(collection(db, "posts"));
	// 		const unsubscribe = onSnapshot(q, (querySnapshot) => {
	// 			let postsArr: Array<any> = [];
	// 			querySnapshot.forEach((doc) => {
	// 				postsArr.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			console.log("postsArr --- LAVDA SAALA");
	// 			setPosts(postsArr);
	// 		});
	// 		console.log("object");
	// 		return () => unsubscribe();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, [posts]);

	const handleSubmit = () => {
		try {
			const content = ref.current.value;
			// content = content.strip();

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
	// console.log(posts);
	const router = useRouter();
	// if(localStorage.getItem('currUser') !== null){
	//     router.push('/');
	// }
	// const user = localStorage.getItem('currUser');
	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		router.push("/");
	// 	}
	// }, []);
	// return <pre>{JSON.stringify(posts, null, 2)}</pre>;

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
						className="h-[10vh] w-12 md:w-1/4 items-center bg-primary-darkGrey rounded-lg flex justify-center hover:border border-primary-orange ease-in duration-200 hover:scale-105"
					>
						<Image src={sendButton} alt={"Go"} className="h-1/2 w-1/2" />
					</button>
				</div>
			</div>
			{!isYou ? <CardHolder isYou={isYou} /> : <CardHolderYou isYou={isYou} />}
			{/* <Image className="pt-5 ml-12" src={Logo2} alt="Picture of the author" />

			{user ? (
				<div className="text-2xl font-thin text-white pt-5">{user.email}</div>
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
			)} */}
		</div>
	);
}
