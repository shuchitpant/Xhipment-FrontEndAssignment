import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from "firebase/firestore";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { db } from "../firebase";

interface PostType {
	username: string;
	text: string;
	id: string;
}

interface PostContextType {
	posts: undefined | Array<PostType>;
	readPosts: () => void;
	createPost: (e: any) => void;
	deletePost: (id: string) => void;
}

export const PostContext = createContext<PostContextType>({
	posts: undefined,
	readPosts: () => {},
	createPost: () => {},
	deletePost: () => {},
});

interface PostProviderProps {
	children: React.ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
	const [posts, setPosts] = useState<Array<PostType>>();
	const [input, setInput] = useState("");

	// Create post
	const createPost = async (e: any) => {
		e.preventDefault(e);
		if (input === "") {
			alert("Please enter a valid post");
			return;
		}
		await addDoc(collection(db, "posts"), {
			text: input,
			completed: false,
		});
		setInput("");
	};

	// Read post from firebase
	const readPosts = () => {
		const q = query(collection(db, "posts"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let postsArr: Array<any> = [];
			querySnapshot.forEach((doc) => {
				postsArr.push({ ...doc.data(), id: doc.id });
			});
			console.log("postsArr --- LAVDA SAALA");
			setPosts(postsArr);
		});
		return () => unsubscribe();
	};

	// Update post in firebase
	// const toggleComplete = async (post:PostType) => {
	// 	await updateDoc(doc(db, "posts", post.id), {
	// 		completed: !post.completed,
	// 	});
	// };

	// Delete post
	const deletePost = async (id: string) => {
		await deleteDoc(doc(db, "posts", id));
	};

	const value = useMemo(
		() => ({
			posts,
			readPosts,
			createPost,
			deletePost,
		}),
		[]
	);

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

const usePost = () => {
	const context = useContext(PostContext);
	return context;
};
export default usePost;
