import { useState } from "react";
import styles from "./Seat.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addSeat, removeSeat } from "../../app/seatSlice";

export default function Seat({
	readMode,
	readOnly,
	id,
	status,
	space,
	totalTickets,
}) {
	const [statusClass, setStatusClass] = useState(styles[status]);
	const seatsSelected = useSelector((state) => state.seat.seatsSelected);

	const dispatch = useDispatch();

	const seatInSeatsSelected = (id) => {
		if (seatsSelected.includes(id)) {
			return true;
		}
		return false;
	};

	const seatSelectHandler = (event) => {
		event.preventDefault();
		// Manage State
		const seatIsSelected = seatInSeatsSelected(id); // output is true or false (boolean)

		// Validate input
		if (status !== "unavailable" && status !== "occupied") {
			// If less seats are selected than the session's total tickets to be purchased
			if (seatsSelected.length < totalTickets) {
				if (seatIsSelected) {
					dispatch(removeSeat({ seat: id }));
					setStatusClass(styles.available);
				}
				if (!seatIsSelected) {
					dispatch(addSeat({ seat: id }));
					setStatusClass(styles.selected);
				}
			}

			// If the seats selected are equal to the session's total tickets to be purchased
			if (seatsSelected.length === totalTickets) {
				if (seatIsSelected) {
					dispatch(removeSeat({ seat: id }));
					setStatusClass(styles.available);
				}
			}
		}
		return;
	};

	// If its a space seat
	if (space === true) {
		return (
			<svg
				id={id}
				xmlns="http://www.w3.org/2000/svg"
				className={`${styles.seat} ${styles.space}`}
			>
				<rect width="100%" height="100%" />
			</svg>
		);
	}

	return (
		<svg
			id={id}
			xmlns="http://www.w3.org/2000/svg"
			className={
				readOnly === true || readMode === true
					? `${styles["read-only"]} ${styles.seat} ${statusClass}`
					: `${styles.seat} ${statusClass}`
			}
			onClick={seatSelectHandler}
		>
			<rect width="100%" height="100%" />
		</svg>
	);
}
