import Image from "next/image";
import logo from "../../../public/assets/cinemas-logo.png";
import styles from "./LogoBar.module.scss";

export default function LogoBar() {
	return (
		<div className={styles.container}>
			<Image width="120" height="60px" src={logo} alt="" priority />
		</div>
	);
}
