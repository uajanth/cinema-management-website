import Image from "next/image";
import { useRouter } from "next/router";
import seatIcon from "../../../public/assets/seat-icon.svg";
import styles from "./ShowtimeButton.module.scss";

export default function ShowButtonGroup({
	time,
	showId,
	disable,
	onPreviewSeats,
}) {
	const router = useRouter();

	const startBookingForShow = (id) => {};

	return (
		<div className={styles.container}>
			<button
				className={!disable ? styles.time : styles["disabled-time"]}
				onClick={!disable ? () => startBookingForShow(showId) : () => {}}
			>
				{time}
			</button>
			<button
				className={!disable ? styles.seat : styles["disabled-seat"]}
				onClick={!disable ? () => onPreviewSeats(showId) : () => {}}
			>
				<Image
					src={seatIcon}
					alt=""
					width="16px"
					height="16px"
					style={{ marginTop: "0.1rem" }}
				/>
			</button>
		</div>
	);
}
