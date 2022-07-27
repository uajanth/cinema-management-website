import styles from "./ErrorMessage.module.scss";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function ErrorMessage({ header, message }) {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.line1}>
					<MdOutlineErrorOutline size="2rem" />
					<h2>{header}</h2>
				</div>
				<p>{message}</p>
			</div>
		</div>
	);
}
