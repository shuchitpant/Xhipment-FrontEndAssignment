import React, { useContext, useRef } from "react";
import type { ParsedUrlQuery } from "querystring";
// import type { Locale } from './i18n'
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { UserContext } from "../../utils/context/UserContext";
import { PostContext } from "../../utils/context/PostsContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo1 from "../assets/images/MindLine.svg";
import Group12 from "../assets/images/Group12.png";
import Tagline from "../assets/images/tagline.svg";
import Header from "../../components/Header";
import { UserContext } from "../../utils/context/UserContext";
import { auth } from "../../utils/firebase";
import sendButtonLight from "../../assets/images/Send-Light.svg";

interface Post {
	username: string;
	text: string;
	id: string;
}

interface PostType {
	// username: string;
	// text: string;
	// id: string;
	post: Post;
}

interface EditPageProps {
	data: Data;
}

interface Data {
	username: string;
	id: string;
	text: string;
}

const EditPage: NextPage<EditPageProps> = () => {
	const { posts } = useContext(PostContext);
	const { updatePost } = useContext(PostContext);
	const ref = useRef<any>(null);
	const router = useRouter();
	const data = router.query;
	const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
	// let Postid = data.id;

	const handleUpdate = () => {
		try {
			const content = ref.current.value;
			// content = content.strip();

			// idhar neeche wale part mein id pass karwado

			console.log(content);
			if (content.length === 0) {
				alert("Textbox is empty!!!");
				console.log("Empty String is being passed.");
			} else {
				console.log(data.id);
				const id = data.id!;
				updatePost(id! as string, content);
			}
		} catch (error) {
		} finally {
			// ref.current!.value = "";
			alert("your text is changed");
			router.push("/dashboard");
		}
		console.log("Hello");

		console.log("after");
	};

	let text = data.text;
	return (
		<div className=" bg-primary-lessBlack w-screen h-screen overflow-hidden pb-8">
			<Header
				user={user}
				auth={auth}
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
			<div className="flex space-x-2 flex-wrap justify-center items-baseline mt-20">
				<button className="rounded-lg px-6 py-2 bg-primary-orange text-primary-white  text-lg font-semibold ">
					Editing
				</button>
			</div>
			<div>
				<div className="flex space-x-4 flex-wrap justify-center items-center mt-20 input-group-outline mb-6 h-[10vh]">
					<textarea
						typeof="text"
						className="block px-2 pt-3 w-3/4 md:w-1/3 text-sm text-primary-white bg-transparent rounded-lg border border-primary-purple h-[10vh] placeholder-white font-semibold "
						placeholder=""
						ref={ref}
						id="message"
						// value={text}
						name="message"
						rows={4}
					>
						{text}
					</textarea>
					<button
						type="button"
						// onClick={handleSubmit}
						className="h-[10vh] w-[13%] md:w-1/12 items-center bg-primary-purple rounded-lg flex justify-center hover:border border-primary-white ease-in duration-200 hover:scale-105"
						onClick={handleUpdate}
					>
						<Image src={sendButtonLight} alt={"Go"} className="h-1/2 w-1/2" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditPage;

// export const getStaticPaths: GetStaticPaths = async () => {
// 	// const { posts } = useContext(PostContext);
// 	let paths: { params: { id: string } }[] = [];

// 	try {
// 		paths = posts!.map((post) => ({
// 			params: { id: post.id },
// 		}));
// 	} catch (err) {
// 		console.error(err);
// 	}

// 	return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async () => {
// 	// const { posts } = useContext(PostContext);
// 	let data: Post[] = [];
// 	try {
// 		posts!.map((post) => ({
// 			data: post,
// 		}));
// 	} catch (err) {
// 		console.error(err);
// 	}
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// };
