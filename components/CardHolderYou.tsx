import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { PostContext } from "../utils/context/PostsContext";
import { UserContext } from "../utils/context/UserContext";
import Card from "./Card";

interface Post {
	username: string;
	text: string;
	id: string;
}

interface PostType {
	username: string;
	text: string;
	id: string;
	post: Post;
}
interface Props {
	isYou: boolean;
}

const CardHolderYou: NextPage<Props> = (props) => {
	const { isYou } = props;
	const { posts, readPosts } = useContext(PostContext);
	const { user } = useContext(UserContext);
	useEffect(() => {
		readPosts();
	}, []);
	const myPosts = posts?.filter((post) => post.username === user?.displayName);
	if (myPosts === undefined) {
		return <div>Loading.....</div>;
	} else {
		return (
			<>
				<div className="max-w-7xl h-[50vh] mx-auto px-4 md:px-8 overflow-auto">
					{myPosts!
						.slice(0)
						.reverse()
						.map((post) => (
							<Card
								key={post.id}
								username={post.username}
								text={post.text}
								isYou={isYou}
								id={post.id}
							/>
						))}
					{/* <CardWithButton  /> */}
				</div>
			</>
		);
	}
};

export default CardHolderYou;
