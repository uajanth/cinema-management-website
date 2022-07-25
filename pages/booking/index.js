import { useRouter } from "next/router";
import { IoExitOutline, IoExit } from "react-icons/io5";
import styles from "../../styles/Booking.module.scss";
import Head from "next/head";
import LogoBar from "../../src/components/LogoBar";
import CheckoutProgress from "../../src/components/CheckoutProgress";
import ShowDetails from "../../src/components/ShowDetails";
import TicketSelection from "../../src/containers/TicketSelection";

export default function Booking({ session, show, movie }) {
	console.log("session", session);
	console.log("show", show);
	console.log("movie", movie);

	const router = useRouter();
	const exitSessionHandler = () => {
		router.push("/");
	};

	return (
		<div>
			<Head>
				<title>
					Woodside Cinemas | Indian Movies, Showtimes, Tickets, Trailers
				</title>
				<meta name="description" content="Woodside Cinemas" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.container}>
				<LogoBar />
				<div className={styles["link-container"]}>
					<a className={styles.link} onClick={exitSessionHandler}>
						Exit
						<IoExitOutline className={styles.icon} />
						<IoExit className={styles.icon2} />
					</a>
				</div>
				{session && (
					<div className={styles.content}>
						<div className={styles["col-1"]}>
							<CheckoutProgress step={session.checkoutStep} />
						</div>
						<div className={styles["col-2"]}>
							<ShowDetails
								show={show}
								posterLink={movie.posterLink}
								title={movie.title}
								rating={movie.rating}
								runtime={movie.runtimeStr}
								date={show.date}
								startTime={show.startTime12}
								theatre={show.theatre.theatre}
								seats={session.seats}
								language={show.language}
							/>
							{session.checkoutStep == 1 && <TicketSelection />}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	// 1. Get Session
	// 2. Get Show > Get Movie
	try {
		const sessionResponse = await fetch(
			`http://localhost:3000/sessions/id/${context.query.sessionId}`
		);
		if (sessionResponse.ok) {
			const session = await sessionResponse.json();

			try {
				const showResponse = await fetch(
					`http://localhost:3000/shows/id/${session.sessionDetails.showId}`
				);

				if (showResponse.ok) {
					const show = await showResponse.json();

					return {
						props: {
							session: session.sessionDetails,
							show: show[0],
							movie: show[0].movie,
						},
					};
				}

				throw new Error();
			} catch (error) {
				console.log(error);
				throw new Error();
			}
		}
		throw new Error();
	} catch (error) {
		console.log(error);
		return {
			props: {
				session: false,
				show: false,
				movie: false,
			},
		};
	}
}
