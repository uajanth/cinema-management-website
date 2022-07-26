import { useRouter } from "next/router";
import { IoExitOutline, IoExit } from "react-icons/io5";
import styles from "../../styles/Booking.module.scss";
import Head from "next/head";
import LogoBar from "../../src/components/LogoBar";
import CheckoutProgress from "../../src/components/CheckoutProgress";
import ShowDetails from "../../src/components/ShowDetails";
import TicketSelection from "../../src/containers/TicketSelection";
import TheatreContainer from "../../src/containers/TheatreContainer";
import OrderSummary from "../../src/containers/OrderSummary";
import ErrorMessage from "../../src/components/ErrorMessage";

export default function Booking({ session, show, movie }) {
	const BOOKINGFEE = 1.2;

	const router = useRouter();

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const deleteSession = async (id) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/sessions/id/${id}`,
				{
					method: "DELETE",
					header: { "Content-Type": "application/json" },
				}
			);

			if (response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error();
		} catch (error) {
			console.log(error);
			return;
		}
	};

	const exitSessionHandler = async () => {
		const sessionId = router.query.sessionId;
		await deleteSession(sessionId);
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

			<LogoBar />
			<div className={styles["link-container"]}>
				<a
					className={styles.link}
					onClick={() => {
						exitSessionHandler();
					}}
				>
					Exit
					<IoExitOutline className={styles.icon} />
					<IoExit className={styles.icon2} />
				</a>
			</div>
			<main
				className={styles.container}
				style={{
					justifyContent: session === false ? "flex-start" : "center",
					backgroundColor: session !== false ? "white" : "",
				}}
			>
				{session && (
					<div className={styles.content}>
						<div className={styles["col-1"]}>
							<CheckoutProgress step={session.checkoutStep} />
						</div>
						<div className={styles["col-2"]}>
							<ShowDetails
								show={show}
								session={session}
								posterLink={movie.posterLink}
								title={movie.title}
								rating={movie.rating}
								runtime={movie.runtimeStr}
								date={show.date}
								startTime={show.startTime12}
								theatre={show.theatre.theatre}
								seats={session.seats}
								language={show.language}
								expiresAt={session.expiresAt}
							/>
							{session.checkoutStep == 1 && (
								<TicketSelection
									session={session}
									onProceed={refreshData}
									fee={BOOKINGFEE}
								/>
							)}
							{session.checkoutStep == 2 && (
								<TheatreContainer
									session={session}
									showId={show._id}
									onProceed={refreshData}
								/>
							)}
							{session.checkoutStep == 3 && (
								<OrderSummary
									session={session}
									fee={BOOKINGFEE}
									movie={movie}
									show={show}
								/>
							)}
						</div>
					</div>
				)}
				{session === false && (
					<ErrorMessage
						header="404 - This page could not be found"
						message="Invalid session. It does not exist or may have expired!"
					/>
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
			`${process.env.NEXT_PUBLIC_BACKEND}/sessions/id/${context.query.sessionId}`
		);
		if (sessionResponse.ok) {
			const session = await sessionResponse.json();

			try {
				const showResponse = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND}/shows/id/${session.sessionDetails.showId}`
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
