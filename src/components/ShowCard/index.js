import styles from "./ShowCard.module.scss";

export default function ShowCard({}) {
	const containerColor = 1 % 2 === 0 ? "#EFEFEF" : "#FAFAFA";
	return (
		<div
			className={styles.container}
			style={{ backgroundColor: containerColor }}
		>
			Example
		</div>
	);
}
