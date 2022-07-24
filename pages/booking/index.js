import { useRouter } from "next/router";
import Link from "next/link";
import { IoExitOutline, IoExit } from "react-icons/io5";
import styles from "../../styles/Booking.module.scss";
import Head from "next/head";
import LogoBar from "../../src/components/LogoBar";

export default function Booking({ showDetails, session }) {
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
					<Link id="exit" href="/" passHref>
						<a className={styles.link}>
							Exit
							<IoExitOutline className={styles.icon} />
							<IoExit className={styles.icon2} />
						</a>
					</Link>
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	try {
		const showResponse = await fetch(`http://localhost:3000/find-show`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: context.query.showingId }),
		});
		const show = await showResponse.json();

		const sessionResponse = await fetch(
			"http://localhost:3000/session/retrieve",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					showId: context.query.showingId,
					sessionId: context.query.sessionId,
				}),
			}
		);

		const session = await sessionResponse.json();

		return {
			props: {
				showDetails: show[0],
				session: session,
			},
		};
	} catch (error) {
		console.log(error);
		return { props: { showDetails: false, session: false } };
	}
}
