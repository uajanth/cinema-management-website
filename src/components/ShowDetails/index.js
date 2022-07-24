import styles from "./ShowDetails.module.scss";
import Image from "next/image";

export default function ShowDetails({
	show,
	title,
	date,
	seats,
	language,
	theatre,
	rating,
	runtime,
	startTime12,
}) {
	return (
		<div className={styles.container}>
			<div className={styles["col-1"]}>
				<div className={styles.poster}>
					{/* {posterLink ? (
						<Image
							src={posterLink}
							alt={title}
							layout="fixed"
							width="170px"
							height="255px"
							priority
						/>
					) : null} */}
				</div>
			</div>
			<div className={styles["col-2"]}>
				<div className={styles.heading}>
					<h2>{title ? title : "Movie Title"}</h2>
					<h3
						className={styles["movie-details"]}
					>{`${rating} | ${runtime}`}</h3>
				</div>
				<div className={styles.date}>
					<h5>{date ? date : "Date"}</h5>
				</div>
				<div className={styles.time}>
					<h5>{startTime12 ? startTime12 : "Time"}</h5>
				</div>
				<div className={styles.screen}>
					<h5>{theatre ? theatre : "Screen"}</h5>
				</div>
				<div className={styles.seats}>
					<h5>{seats ? seats : "Seats"}</h5>
				</div>
				<div className={styles.language}>
					<h5>{language ? language : "Language"}</h5>
				</div>
			</div>
		</div>
	);
}
