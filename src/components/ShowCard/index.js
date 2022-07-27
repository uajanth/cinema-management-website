import { useEffect, useState } from "react";
import styles from "./ShowCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getTime, format } from "date-fns";
import LanguageTag from "../LanguageTag";
import ShowButtonGroup from "../ShowButtonGroup";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showModal } from "../../app/modalSlice";

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
	const [showLanguages, setShowLanguages] = useState({});

	useEffect(() => {
		setShowLanguages(transformLanguage(language));
	}, []);

	const dispatch = useDispatch();

	const cardColor = index % 2 === 0 ? "#EFEFEF" : "#FAFAFA";

	const transformLanguage = (language) => {
		const movieLanguages = language.split(", ");
		const showLanguages = showtimes.map((show) => show.language);
		const playingLanguages = [];

		movieLanguages.forEach((language) => {
			if (
				!playingLanguages.includes(language) &&
				showLanguages.includes(language)
			) {
				playingLanguages.push(language);
			}
		});

		return playingLanguages;
	};

	return (
		<div className={styles.container} style={{ backgroundColor: cardColor }}>
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
						<a
							className={styles.link}
							onClick={() => {
								dispatch(
									showModal({
										type: "view-trailer",
										info: { title, trailerLink },
									})
								);
							}}
						>
							<IoPlayCircle fontSize="large" />
							<h4>View Trailer</h4>
						</a>
					</Link>
				</div>
				<div className={styles.languages}>
					{showLanguages.length > 0 &&
						showLanguages.map((language, index) => {
							return (
								<div key={index} className={styles.language}>
									<LanguageTag language={language} />
									<div className={styles.shows}>
										{showtimes
											.filter((showtime) => showtime.language == language)
											.sort((a, b) => (a.startTime >= b.startTime ? 1 : -1))
											.map((show, index) => {
												if (
													getTime(
														new Date(
															`${format(new Date(show.date), "yyyy-MM-dd")} ${
																show.startTime
															}`
														)
													) < getTime(new Date())
												) {
													return (
														<ShowButtonGroup
															key={index}
															showId={show._id}
															time={show.startTime12}
															disable={true}
														/>
													);
												}
												return (
													<ShowButtonGroup
														key={index}
														showId={show._id}
														title={title}
														time={show.startTime12}
													/>
												);
											})}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
