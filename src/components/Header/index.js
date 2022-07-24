import styles from "./Header.module.scss";

export default function Header({ text, color }) {
	return (
		<div className={styles.container}>
			<div className={styles.marker} style={{ backgroundColor: color }} />
			<div className={styles.text}>
				<h2 style={{ margin: 0, fontWeight: 600 }}>{text}</h2>
			</div>
		</div>
	);
}
