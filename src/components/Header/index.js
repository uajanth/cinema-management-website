import styles from "./Header.module.scss";

export default function Header({ text, color }) {
	return (
		<div className={styles.container}>
			<div className={styles.marker} style={{ backgroundColor: "red" }} />
			<div className={styles["header-title"]}>
				<h2 style={{ margin: 0, fontWeight: 600 }}>Showtimes &amp; Tickets</h2>
			</div>
		</div>
	);
}
