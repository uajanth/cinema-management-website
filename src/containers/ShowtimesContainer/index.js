import styles from "./ShowtimeContainer.module.scss";
import Header from "../../components/Header";
import DateContainer from "../DateContainer";

export default function ShowtimeContainer() {
	return (
		<div className={styles.container}>
			<Header text="Showtimes &amp; Tickets" color="#007DD8" />
			<DateContainer />
		</div>
	);
}
