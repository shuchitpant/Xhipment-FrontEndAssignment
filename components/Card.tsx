import { NextPage } from "next";
import React, { useContext } from "react";
import { PostContext } from "../utils/context/PostsContext";
import router from "next/router";
import Link from "next/link";

interface Post {
	username: string;
	text: string;
	id: string;
}

interface PostType {
	post: Post;
}

interface Props {
	username: string;
	text: string;
	id: string;
	isYou: boolean;
}

interface Query {
	username: string;
	text: string;
	id: string;
}

const Card: NextPage<Props> = (props) => {
	const { deletePost, updatePost, post } = useContext(PostContext);
	const { username, text, id, isYou } = props;

	const handleDelete = () => {
		deletePost(id);
	};
	const handleEdit = () => {
		router.push(`/edit`);
	};

	return (
		<div className="border border-primary-orange bg-transparent max-w-7xl p-4 mb-5 rounded-lg">
			<div className="text-primary-orange">{username}</div>
			<p className="mt-3 text-primary-white">{text}</p>
			{isYou ? (
				<div className="flex flex-wrap mt-5 space-x-4">
					<Link
						href={{
							pathname: "/edit",
							query: { username: username, id: id as string, text: text },
						}}
					>
						<button className="rounded-lg px-5 h-full bg-primary-purple text-black font-semibold hover:scale-105 duration-300">
							edit
						</button>
					</Link>
					<button
						className="rounded-lg px-4 py-1 bg-primary-crimson text-black text-lg font-semibold hover:scale-105 duration-300"
						onClick={() => handleDelete()}
					>
						delete
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Card;
