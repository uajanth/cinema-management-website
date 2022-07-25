import styles from "./TicketSelection.module.scss";
import TicketItem from "../../components/TicketItem";

export default function TicketSelection() {
	const BOOKINGFEE = 1.2;
	const TICKETSDB = [
		{ price: 15, name: "General" },
		{ price: 10, name: "Child" },
		{ price: 10, name: "Senior" },
	];

	const totalTickets = 1;

	return (
		<div className={styles.container}>
			<h1>Standard Tickets</h1>
			{TICKETSDB.map((ticket, index) => {
				return (
					<TicketItem key={index} price={ticket.price} name={ticket.name} />
				);
			})}
			<div className={styles["line-container"]}>
				<p className={styles["line-heading"]}>Booking Fee</p>
				<p>{`$${(BOOKINGFEE * totalTickets).toFixed(2)}`}</p>
			</div>
			<div className={styles["line-container"]}>
				<div>
					<p className={styles["line-heading"]}>Subtotal</p>
					<p className={styles["line-subheading"]}>
						Applicable taxes will be calculated at checkout.
					</p>
				</div>
				<div>
					<p>$0.00</p>
				</div>
			</div>
			<button className={styles.proceed}>Proceed</button>
		</div>
	);
}
