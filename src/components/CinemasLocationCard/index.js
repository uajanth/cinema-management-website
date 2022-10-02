import styles from "./CinemasLocationCard.module.scss";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function CinemasLocationCard({ name, address, phone, city }) {
	return (
		<div className={styles.container}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
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
