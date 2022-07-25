import styles from "./TicketItem.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../app/ticketSlice";

export default function TicketItem({ name, price }) {
	const ticketsByGroup = useSelector((state) => state.ticket.ticketsByGroup);
	const ticketInfo = ticketsByGroup.filter((group) => group.name === name);
	const quantity = ticketInfo[0].quantity;

	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<div className={styles["col-1"]}>
				<h4 className={styles.name}>{name}</h4>
				<p className={styles.price}>{`$${price.toFixed(2)}`}</p>
			</div>
			<div className={styles["col-2"]}>
				{quantity === 0 && (
					<button
						className={styles["add-button"]}
						onClick={() =>
							dispatch(
								increment({
									name: name,
								})
							)
						}
					>
						Add
					</button>
				)}
				{quantity > 0 && (
					<div className={styles["secondary-button-container"]}>
						<button
							className={styles["secondary-button"]}
							onClick={() =>
								dispatch(
									decrement({
										name: name,
									})
								)
							}
						>
							-
						</button>
						<p className={styles.tickets}>{quantity}</p>
						<button
							className={styles["secondary-button"]}
							onClick={() =>
								dispatch(
									increment({
										name: name,
									})
								)
							}
						>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
