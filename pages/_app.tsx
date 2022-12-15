import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../utils/context/UserContext";
import { PostProvider } from "../utils/context/PostsContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<PostProvider>
				<Component {...pageProps} />
			</PostProvider>
		</UserProvider>
	);
}
