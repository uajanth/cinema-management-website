import styles from "./ShowDetails.module.scss";
import Image from "next/image";
import LanguageTag from "../LanguageTag";
import SessionCounter from "../SessionCounter";
import format from "date-fns/format";
import { useSelector } from "react-redux";

export default function ShowDetails({
	show,
	session,
	posterLink,
	title,
	rating,
	runtime,
	date,
	startTime,
	theatre,
	seats,
	language,
	expiresAt,
}) {
	const seatsSelected = useSelector((state) => state.seat.seatsSelected);

	const formatSeatsSelected =
		session.seatsSelected == "[]" && seatsSelected.length > 0
			? seatsSelected.join(", ")
			: session.seatsSelected != "[]"
			? session.seatsSelected
			: "NA";

	return (
		<div className={styles.container}>
			<div className={styles["box-1"]}>
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
						<LanguageTag language={language} />
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
						<h5>Tickets</h5>
						<h4>{session.totalTickets}</h4>
					</div>
					<div className={styles.seats}>
						<h5>Seats</h5>
						<h4>{formatSeatsSelected}</h4>
					</div>
				</div>
			</div>
			<SessionCounter expiresAt={expiresAt} />
		</div>
	);
}
