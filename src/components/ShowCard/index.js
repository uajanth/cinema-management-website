import styles from "./ShowCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { IoPlayCircle } from "react-icons/io5";

export default function ShowCard({
	index,
	title,
	language,
	cast,
	director,
	rating,
	runtime,
	trailerLink,
	posterLink,
	showtimes,
}) {
	const containerColor = index % 2 === 0 ? "#EFEFEF" : "#FAFAFA";

	return (
		<div
			className={styles.container}
			style={{ backgroundColor: containerColor }}
		>
			<div className={styles["col-1"]}>
				<div className={styles.poster}>
					{posterLink ? (
						<Image
							src={posterLink}
							alt={title}
							layout="fixed"
							width="135px"
							height="205px"
							priority
						/>
					) : null}
				</div>
			</div>
			<div className={styles["col-2"]}>
				<div className={styles.heading}>
					<h3>{title ? title : "Movie Title"}</h3>
					<h4>{`${rating ? rating : "N/A"} | ${runtime ? runtime : "hrs"}`}</h4>
				</div>
				<div className={styles.cast}>
					<h5>{`Cast:  ${cast ? cast : "Actor1, Actor2, Actor3"}`}</h5>
				</div>
				<div className={styles.director}>
					<h5>{`Director:  ${director ? director : "Director"}`}</h5>
				</div>
				<div className={styles.trailer}>
					<Link href="/" passHref>
						<a className={styles.link} onClick={() => {}}>
							<IoPlayCircle fontSize="large" />
							<h4>View Trailer</h4>
						</a>
					</Link>
				</div>
				<div className={styles.language}>Language(s)</div>
			</div>
		</div>
	);
}
