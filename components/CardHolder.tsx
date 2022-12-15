import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { PostContext } from "../utils/context/PostsContext";
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

const CardHolder: NextPage<Props> = (props) => {
	const { isYou } = props;
	const { posts, readPosts } = useContext(PostContext);
	useEffect(() => {
		readPosts();
	}, []);
	// console.log(posts);
	if (posts === undefined) {
		return <div>Loading.....</div>;
	} else {
		return (
			<>
				<div className="max-w-7xl h-[50vh] mx-auto px-4 md:px-8 overflow-auto">
					{posts!
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

export default CardHolder;
