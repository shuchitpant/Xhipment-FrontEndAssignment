import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

import { userInfo } from "os";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { db } from "../firebase";
import { UserContext } from "./UserContext";

interface Post {
	username: string;
	text: string;
	id: string;
}

interface PostType {
	id: string;
	text: string;
	username: string;
	// username: string;
	// text: string;
	// id: string;
	post: Post;
}

interface PostContextType {
	posts: undefined | Array<PostType>;
	readPosts: () => void;
	createPost: (post: string, name: string | undefined | null) => void;
	deletePost: (id: string) => void;
	updatePost: (id: string, text: string) => void;
	post: PostType | undefined;
	// setpost
}

export const PostContext = createContext<PostContextType>({
	posts: undefined,
	post: undefined,
	readPosts: () => {},
	createPost: () => {},
	deletePost: () => {},
	updatePost: () => {},
	//setpost
});

interface PostProviderProps {
	children: React.ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
	const [posts, setPosts] = useState<Array<PostType>>();
	const [post, setPost] = useState(undefined);
	const { user, isAuthenticated } = useContext(UserContext);

	// Create post
	const createPost = async (post: string, name: string | undefined | null) => {
		// console.log(user, isAuthenticated);

		if (name) {
			const newPost = {
				id: uuidv4(),
				username: name,
				text: post,
			};
			await addDoc(collection(db, "PostDB"), newPost);
			console.log(newPost);
		} else {
			console.error("User Not Found");
		}
	};

	// Read post from firebase
	const readPosts = () => {
		const q = query(collection(db, "PostDB"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let postsArr: Array<any> = [];
			querySnapshot.forEach((doc) => {
				postsArr.push({ ...doc.data(), id: doc.id });
			});
			console.log(postsArr);
			setPosts(postsArr);
		});
		return () => unsubscribe();
	};

	// Update post in firebase
	const updatePost = async (id: string, text: string) => {
		// we need to include the text content as a parameter above aswell
		console.log("is the update function being called");
		await updateDoc(doc(db, "PostDB", id), {
			// ...posts,
			text: text,
		});
	};

	// Delete post
	const deletePost = async (id: string) => {
		await deleteDoc(doc(db, "PostDB", id));
	};

	const value = useMemo(
		() => ({
			post,
			posts,
			readPosts,
			createPost,
			deletePost,
			updatePost,
		}),
		[posts]
	);

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

const usePost = () => {
	const context = useContext(PostContext);
	return context;
};
export default usePost;
