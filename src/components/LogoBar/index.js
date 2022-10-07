import Image from "next/image";
import logo from "../../../public/assets/cinemas-logo.png";
import styles from "./LogoBar.module.scss";
import { useRouter } from "next/router";

export default function LogoBar() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Image
				style={{ cursor: "pointer" }}
				width="120"
				height="60px"
				src={logo}
				alt=""
				onClick={() => router.replace("/")}
				priority
			/>
		</div>
	);
}
