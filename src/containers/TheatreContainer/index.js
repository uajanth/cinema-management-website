import styles from "./TheatreContainer.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetSeat } from "../../app/seatSlice";
import { useRouter } from "next/router";
import Row from "../../components/Row";
import Seat from "../../components/Seat";

export default function TheatreContainer({ showId, session, onProceed }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetSeat());
	}, []);

	const seatsSelected = useSelector((state) => state.seat.seatsSelected);
	const [rows, setRows] = useState([]);

	const router = useRouter();
	const sessionId = router.query.sessionId;

	useEffect(() => {
		fetchTheatreForShow(showId);
	}, []);

	const fetchTheatreForShow = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3000/shows/id/${id}/theatre`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			if (response.ok) {
				const theatre = await response.json();

				if (theatre[0]?.theatre?.verticalSort === "descending") {
					return setRows(
						theatre[0].theatre.rows.sort((a, b) => (a.name < b.name ? 1 : -1))
					);
				}

				if (theatre[0]?.theatre?.verticalSort === "ascending") {
					return setRows(
						theatre[0].theatre.rows.sort((a, b) => (a.name < b.name ? -1 : 1))
					);
				}
			}

			throw new Error(error);
		} catch (error) {
			console.log(error);
			return;
		}
	};

	const proceedHandler = async (state) => {
		if (Number(session.totalTickets) === seatsSelected.length) {
			try {
				const response = await fetch(`http://localhost:3000/sessions/id`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: sessionId,
						totalTickets: "false",
						ticketsByGroup: "false",
						seatsSelected: seatsSelected.join(", "),
						checkoutStep: "3",
					}),
				});
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					onProceed();
					console.log("Moving onto step 3!");
					return;
				}
				throw new Error();
			} catch (error) {
				console.log(error);
				return;
			}
		}
		return;
	};

	return (
		<main className={styles.main}>
			<div className={styles.screen}>SCREEN</div>
			<div className={styles.row}>
				{rows?.map((row, index) => {
					return (
						<Row
							key={index}
							name={row.name}
							seats={row.seats}
							totalTickets={Number(session.totalTickets)}
						/>
					);
				})}
			</div>
			{/* <div className={styles.legend}>
				<div className={styles.seat}>
					<Seat status="available" />
					<h5>Available</h5>
				</div>
				<div className={styles.seat}>
					<Seat status="selected" disabled={true} />
					<h5>Selected</h5>
				</div>
				<div className={styles.seat}>
					<Seat status="occupied" disabled={true} />
					<h5>Occupied</h5>
				</div>
				<div className={styles.seat}>
					<Seat status="unavailable" disabled={true} />
					<h5>Unavailable</h5>
				</div>
			</div> */}
			<button
				disabled={
					Number(session.totalTickets) != seatsSelected.length ? true : false
				}
				className={
					Number(session.totalTickets) === seatsSelected.length
						? `${styles.proceed}`
						: `${styles.proceed} ${styles.disabled}`
				}
				onClick={() => proceedHandler()}
			>
				Proceed
			</button>
		</main>
	);
}