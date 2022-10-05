import styles from "./CinemasLocationCard.module.scss";

export default function CinemasLocationCard({
	isSelected,
	name,
	address,
	phone,
	city,
}) {
	const clickHandler = (event) => {
		if (isSelected) {
			return;
		}
		return alert(`This demo does not include ${name}!`);
	};
	return (
		<div
			onClick={clickHandler}
			className={`${styles.container} ${
				isSelected ? styles.selected : styles.selectable
			}`}
		>
			<div className={styles.top}>
				<h4>{name}</h4>
				<h5>{city}</h5>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.25rem",
				}}
			>
				<p>{address}</p>
				<p>Tel: {`${phone}`}</p>
			</div>
		</div>
	);
}
