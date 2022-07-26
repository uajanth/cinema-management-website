import styles from "./TicketSelection.module.scss";
import TicketItem from "../../components/TicketItem";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetTickets } from "../../app/ticketSlice";
import { useState, useEffect } from "react";

export default function TicketSelection({ session, onProceed, fee }) {
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetTickets());
	}, []);

	const router = useRouter();
	const sessionId = router.query.sessionId;

	// Payment processor sets this value
	const BOOKINGFEE = fee;

	// Redux Ticket State
	const totalTickets = useSelector((state) => state.ticket.totalTickets);
	const TICKETSDB = useSelector((state) => state.ticket.ticketsByGroup);
	const ticketState = useSelector((state) => state.ticket);

	// Subtotal
	const bookingSubtotal = BOOKINGFEE * totalTickets;
	const ticketSubtotal = TICKETSDB.reduce((acc, group) => {
		return acc + group.price * group.quantity;
	}, 0);

	const subtotal = (bookingSubtotal + ticketSubtotal).toFixed(2);

	const emailChangeHandler = (event) => {
		event.preventDefault();
		setEmail(event.target.value);
	};

	const proceedHandler = async (state) => {
		if (state.totalTickets > 0 && /^\S+@\S+\.\S+$/.test(email)) {
			const jsonTicketsByGroup = JSON.stringify(state.ticketsByGroup);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND}/sessions/id`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: sessionId,
							email,
							totalTickets,
							ticketsByGroup: jsonTicketsByGroup,
							seatsSelected: "false",
							checkoutStep: "2",
						}),
					}
				);
				if (response.ok) {
					const data = await response.json();
					onProceed();
					return;
				}
				throw new Error();
			} catch (error) {
				return;
			}
		}
	};

	return (
		<div className={styles.container}>
			<h1>Standard Tickets</h1>
			{TICKETSDB.map((ticket, index) => {
				return (
					<TicketItem
						key={index}
						price={ticket.price}
						name={ticket.name}
						quantity={ticket.quantity}
					/>
				);
			})}
			<hr className={styles.divider} />

			<div className={styles["line-container"]}>
				<p className={styles["line-heading"]}>Booking Fee</p>
				<p>{`$${bookingSubtotal.toFixed(2)}`}</p>
			</div>
			<div className={styles["line-container"]}>
				<div>
					<p className={styles["line-heading"]}>Subtotal</p>
					<p className={styles["line-subheading"]}>
						Applicable taxes will be calculated at checkout.
					</p>
				</div>
				<div>
					<p>{`$${subtotal}`}</p>
				</div>
			</div>
			<div className={styles.email}>
				<label>Email</label>
				<input type="email" value={email} onChange={emailChangeHandler} />
			</div>
			<button
				disabled={
					totalTickets == 0 && !/^\S+@\S+\.\S+$/.test(email) ? true : false
				}
				className={
					totalTickets > 0 && /^\S+@\S+\.\S+$/.test(email)
						? `${styles.proceed}`
						: `${styles.proceed} ${styles.disabled}`
				}
				onClick={() => proceedHandler(ticketState)}
			>
				Proceed
			</button>
		</div>
	);
}
