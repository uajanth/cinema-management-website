import styles from "./TicketItem.module.scss";

export default function TicketItem({ name, price, numberOfTickets = 0 }) {
	const totalTickets = 0;
	return (
		<div className={styles.container}>
			<div className={styles["col-1"]}>
				<h4 className={styles.name}>{name}</h4>
				<p className={styles.price}>{`$${price.toFixed(2)}`}</p>
			</div>
			<div className={styles["col-2"]}>
				{numberOfTickets === 0 && (
					<button className={styles["add-button"]}>Add</button>
				)}
				{numberOfTickets > 0 && (
					<div className={styles["button-container"]}>
						<button className={styles["secondary-button"]}>-</button>
						<p className={styles.tickets}>{numberOfTickets}</p>
						<button className={styles["secondary-button"]}>+</button>
					</div>
				)}
			</div>
		</div>
	);
}
