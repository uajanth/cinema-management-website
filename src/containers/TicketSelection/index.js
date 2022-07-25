import styles from "./TicketSelection.module.scss";
import TicketItem from "../../components/TicketItem";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function TicketSelection({ session, onProceed }) {
	const router = useRouter();
	const sessionId = router.query.sessionId;

	// Payment processor sets this value
	const BOOKINGFEE = 1.2;

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

	const proceedHandler = async (state) => {
		if (state.totalTickets > 0) {
			const jsonTicketsByGroup = JSON.stringify(state.ticketsByGroup);
			try {
				const response = await fetch(`http://localhost:3000/sessions/id`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: sessionId,
						totalTickets,
						ticketsByGroup: jsonTicketsByGroup,
						seatsSelected: "false",
						checkoutStep: "2",
					}),
				});
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					onProceed();
					console.log("Updated session!");
					return;
				}
				throw new Error();
			} catch (error) {
				console.log(error);
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
			<button
				disabled={totalTickets == 0 ? true : false}
				className={
					totalTickets > 0
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
