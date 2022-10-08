import styles from "./MovieContainer.module.scss";
import { useDispatch } from "react-redux";
import { showModal } from "../../app/modalSlice";
import Header from "../../components/Header";
import Image from "next/image";
import { IoPlayCircle, IoTicket } from "react-icons/io5";
import { format } from "date-fns";

export default function MovieContainer({ movie }) {
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<Header text="Movie" color="#007DD8" />
			<div className={styles.content}>
				<div className={styles.header}>
					<h1>{movie?.title}</h1>
					<div className={styles.hightlights}>
						<div className={styles["highlights-row"]}>
							<div className={styles.highlight}>
								<h5 className={styles["highlight-title"]}>Release Date</h5>
								<p className={styles["highlight-body"]}>
									{format(new Date(movie?.releaseDate), "LLLL dd, yyyy")}
								</p>
							</div>
							<div className={styles.highlight}>
								<h5 className={styles["highlight-title"]}>Rating</h5>
								<p className={styles["highlight-body"]}>{movie?.rating}</p>
							</div>
							<div className={styles.highlight}>
								<h5 className={styles["highlight-title"]}>Length</h5>
								<p className={styles["highlight-body"]}>{movie?.runtimeStr}</p>
							</div>
						</div>
						<div className={styles["highlights-row"]}>
							<div className={styles.highlight}>
								<h5 className={styles["highlight-title"]}>Language</h5>
								<p className={styles["highlight-body"]}>{movie?.language}</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles["details-1"]}>
						<Image
							src={movie?.posterLink}
							alt={movie?.title}
							layout="fixed"
							width="135px"
							height="205px"
							priority
						/>
						<div className={styles.actions}>
							<button
								className={styles.button1}
								style={{ cursor: "not-allowed" }}
							>
								<IoTicket fontSize="small" />
								Buy Tickets
							</button>
							{!movie.trailerLink.includes("undefined") && (
								<button
									className={styles.button2}
									onClick={() => {
										dispatch(
											showModal({
												type: "view-trailer",
												info: {
													title: movie.title,
													trailerLink: movie.trailerLink,
												},
											})
										);
									}}
								>
									<IoPlayCircle fontSize="medium" />
									View Trailer
								</button>
							)}
						</div>
					</div>
					<div className={styles["details-2"]}>
						<div className={styles.highlight}>
							<h5 className={styles["highlight-title"]}>Cast</h5>
							<p className={styles["highlight-body"]}>{movie?.cast}</p>
						</div>
						<div className={styles.highlight}>
							<h5 className={styles["highlight-title"]}>Director</h5>
							<p className={styles["highlight-body"]}>{movie?.director}</p>
						</div>
						<div className={styles.highlight}>
							{movie?.summary !== "NA" && (
								<>
									<h5 className={styles["highlight-title"]}>Summary</h5>
									<p className={styles["highlight-body"]}>{movie?.summary}</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
