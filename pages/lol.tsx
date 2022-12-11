import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { isIfStatement } from "typescript";
import usePost from "../utils/context/postContext";
import useAuth, { UserContext } from "../utils/context/UserContext";
import { auth, db } from "../utils/firebase";

export default function lol() {
	const { user, isAuthenticated } = useAuth();
	// const { readPosts } = usePost();
	const [posts, setPosts] = useState({});
	useEffect(() => {
		try {
			const q = query(collection(db, "posts"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let postsArr: Array<any> = [];
				querySnapshot.forEach((doc) => {
					postsArr.push({ ...doc.data(), id: doc.id });
				});
				console.log("postsArr --- LAVDA SAALA");
				setPosts(postsArr);
			});
			console.log("object");
			return () => unsubscribe();
		} catch (error) {
			console.log(error);
		}
	}, [posts]);
	console.log(posts);
	const router = useRouter();
	// if(localStorage.getItem('currUser') !== null){
	//     router.push('/');
	// }
	// const user = localStorage.getItem('currUser');
	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/");
		}
	}, []);
	return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
