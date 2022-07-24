import { useRouter } from "next/router";
import { IoExitOutline, IoExit } from "react-icons/io5";
import styles from "../../styles/Booking.module.scss";
import Head from "next/head";
import LogoBar from "../../src/components/LogoBar";

export default function Booking({ showDetails, session }) {
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
				<div className={styles.content}>
					<h1>Hello world</h1>
				</div>
			</main>
		</div>
	);
}
