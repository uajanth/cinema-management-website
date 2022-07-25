import styles from "./ShowDetails.module.scss";
import Image from "next/image";
import format from "date-fns/format";

export default function ShowDetails({
	show,
	posterLink,
	title,
	rating,
	runtime,
	date,
	startTime,
	theatre,
	seats,
	language,
}) {
	return (
		<div className={styles.container}>
			<div className={styles["col-1"]}>
				<div className={styles.poster}>
					{posterLink ? (
						<Image
							src={posterLink}
							alt={title}
							layout="fixed"
							width="170px"
							height="255px"
							priority
						/>
					) : null}
				</div>
			</div>
			<div className={styles["col-2"]}>
				<div className={styles.heading}>
					<h2>{`${title} (${rating})`}</h2>
				</div>
				<div className={styles.date}>
					<h5>Date</h5>
					<h4>{format(new Date(date), "PPPP")}</h4>
				</div>
				<div className={styles.time}>
					<h5>Time</h5>
					<h4>{startTime}</h4>
				</div>
				<div className={styles.screen}>
					<h5>Screen</h5>
					<h4>{theatre}</h4>
				</div>
				<div className={styles.language}>
					<h5>Language</h5>
					<h4>{language}</h4>
				</div>
				<div className={styles.seats}>
					<h5>Seats</h5>
					<h4>{seats}</h4>
				</div>
			</div>
		</div>
	);
}
