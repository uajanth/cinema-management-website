import styles from "./OrderSummary.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

export default function OrderSummary({ session, onProceed, fee }) {
	const [checked, setChecked] = useState(false);

	const totalTickets = Number(session.totalTickets);

	const router = useRouter();
	const sessionId = router.query.sessionId;

	const ticketsByGroup = JSON.parse(session.ticketsByGroup);
	const purchasedGroups = ticketsByGroup.filter(
		(ticket) => ticket.quantity > 0
	);

	// Payment processor sets this value
	const BOOKINGFEE = Number(fee);

	// Subtotal
	const bookingSubtotal = BOOKINGFEE * totalTickets;
	const ticketSubtotal = Number(
		ticketsByGroup.reduce((acc, group) => {
			return acc + group.price * group.quantity;
		}, 0)
	);
	const subtotal = (bookingSubtotal + ticketSubtotal).toFixed(2);

	// Taxes
	const taxRate = 0.13; // 13%
	const totalTaxes = (Number(subtotal) * taxRate).toFixed(2);

	// Total
	const total = (Number(subtotal) + Number(totalTaxes)).toFixed(2);

	const handleTermsCheckbox = (event) => {
		const termsCheckBox = document.getElementById("terms");

		const isChecked = termsCheckBox.getAttribute("checked");

		if (isChecked === "true") {
			termsCheckBox.removeAttribute("checked");
			setChecked(false);
			return;
		}

		termsCheckBox.setAttribute("checked", true);
		setChecked(true);
	};

	const updateSeat = async (id) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/shows/seat`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: session.showId,
						seatId: id,
					}),
				}
			);
			if (response.ok) {
				// console.log(`seat(${id}) updated!`);
				return;
			}
			throw new Error();
		} catch (error) {
			return;
		}
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
			return;
		}
	};

	const submitHandler = async (seats) => {
		if (checked) {
			const transformSeats = seats.split(", ");

			for (let i = 0; i < transformSeats.length; i++) {
				try {
					await updateSeat(transformSeats[i]);
				} catch (error) {}
			}

			await deleteSession(sessionId);

			router.replace("/");
		}

		return;
	};

	return (
		<div className={styles.container}>
			<h1>Order Summary</h1>
			{purchasedGroups.map((group, index) => (
				<div key={index} className={styles.group}>
					<div className={styles["group-info"]}>
						<h2>{group.name}</h2>
						<h4> x{group.quantity}</h4>
					</div>
					<h3>${(group.price * group.quantity).toFixed(2)}</h3>
				</div>
			))}
			<hr className={styles.divider} />
			<div className={styles["line-container"]}>
				<div>
					<p className={styles["line-heading"]}>Booking Fee</p>
					<p className={styles["line-subheading"]}>{`($${BOOKINGFEE.toFixed(
						2
					)} x ${session.totalTickets})`}</p>
				</div>
				<p>{`$${bookingSubtotal.toFixed(2)}`}</p>
			</div>
			<div className={styles["line-container"]}>
				<div>
					<p className={styles["line-heading"]}>Subtotal</p>
				</div>
				<div>
					<p>{`$${subtotal}`}</p>
				</div>
			</div>
			<div className={styles["line-container"]}>
				<div>
					<p className={styles["line-heading"]}>Total</p>
					<p className={styles["line-subheading"]}>{`Taxes - $${totalTaxes} (${(
						taxRate * 100
					).toFixed(1)}%)`}</p>
				</div>
				<div>
					<p>{`$${total}`}</p>
				</div>
			</div>
			<div className={styles.conditions}>
				<input
					type="checkbox"
					id="terms"
					name="terms"
					onChange={handleTermsCheckbox}
					checked={checked && true}
				/>
				<label>
					I have verfied the order details, and accept that all tickets are
					final sale.
				</label>
			</div>
			<button
				disabled={totalTickets == 0 ? true : false}
				className={
					checked ? `${styles.submit}` : `${styles.submit} ${styles.disabled}`
				}
				onClick={() => submitHandler(session.seatsSelected)}
			>
				Submit
			</button>
		</div>
	);
}
