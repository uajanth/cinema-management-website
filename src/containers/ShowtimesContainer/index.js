import Header from "../../components/Header";
import styles from "./ShowtimeContainer.module.scss";

export default function ShowtimeContainer() {
	return (
		<div className={styles.container}>
			<Header text="Showtimes &amp; Tickets" color="red" />
		</div>
	);
}
