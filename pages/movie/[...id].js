import styles from "../../styles/Movie.module.scss";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../../src/components/Modal";
import Head from "next/head";
import LogoBar from "../../src/components/LogoBar";
import NavMenu from "../../src/components/NavMenu";
import ErrorMessage from "../../src/components/ErrorMessage";
import "react-modern-drawer/dist/index.css";
import TheatreContainer from "../../src/containers/TheatreContainer";
import ShowtimeContainer from "../../src/containers/ShowtimesContainer";
import MovieContainer from "../../src/containers/MovieContainer";

export default function Movie({ movie }) {
	const [isBrowser, setIsBrowser] = useState(false); // required to access document
	const modalState = useSelector((state) => state.modal); // redux modalState

	useEffect(() => {
		setIsBrowser(true); // set to true when document is loaded/accessible
	}, []);

	// Disable background scroll when modal is visible
	if (isBrowser && modalState.isVisible) {
		const body = document.querySelector("body");
		body.style.overflow = "hidden";
	}

	// Reset disabled background scroll behavior
	if (isBrowser && !modalState.isVisible) {
		const body = document.querySelector("body");
		body.style.overflow = "";
	}

	console.log(modalState);
	const trailerModal =
		isBrowser && modalState.type === "view-trailer"
			? createPortal(
					<Modal header={`${modalState.info.title} - Trailer`} color="#007DD8">
						<iframe
							width="100%"
							height="400px"
							frameBorder="0"
							border="0"
							cellSpacing="0"
							src={`${modalState.info.trailerLink}?autoplay=1`}
						></iframe>
					</Modal>,
					document.getElementById("modal-root")
			  )
			: null;

	const previewSeatsModal = isBrowser
		? createPortal(
				<Modal
					header={`${modalState.info.title} - ${modalState.info.date} @ ${modalState.info.time}`}
					color="#007DD8"
				>
					<TheatreContainer showId={modalState.info.showId} readMode={true} />
				</Modal>,
				document.getElementById("modal-root")
		  )
		: null;

	return (
		<div>
			<Head>
				<title>
					Woodside Cinemas | Indian Movies, Showtimes, Tickets, Trailers
				</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* View Trailer Modal */}
			{isBrowser &&
				modalState.isVisible &&
				modalState.type === "view-trailer" &&
				trailerModal}

			{/* Preview Seats Modal */}
			{isBrowser &&
				modalState.isVisible &&
				modalState.type === "preview-seats" &&
				previewSeatsModal}

			<LogoBar />
			<NavMenu />
			<main className={styles.container}>
				<div className={styles.content}>
					{movie === undefined && (
						<ErrorMessage
							header="404 - This page could not be found"
							message="Invalid Movie. It does not exist or may have been removed!"
						/>
					)}
					{movie !== undefined && <MovieContainer movie={movie} />}
					<ShowtimeContainer movie={movie} />
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	try {
		const movieResponse = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND}/movies/id/${context.query.id[0]}`
		);
		if (movieResponse.ok) {
			const movie = await movieResponse.json();
			return {
				props: {
					movie: movie[0],
				},
			};
		}
		throw new Error();
	} catch (error) {
		console.log(error);
		return {
			props: {
				movies: [],
			},
		};
	}
}
