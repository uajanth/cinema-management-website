import "../styles/globals.scss";
import { store } from "../src/app/store";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
