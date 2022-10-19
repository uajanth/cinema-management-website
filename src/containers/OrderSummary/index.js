import styles from "./OrderSummary.module.scss";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
	"pk_test_51LLVEnDd3VPVOXYVR69WhhUwCGU8S98vvO5GqdplJcGe0j5lI1oZL6uO0jGWLTi1R98a4K8bvWggTqDFaCZquXY300NU8poxkZ"
);

export default function OrderSummary({ session, fee, movie, show }) {
	const [clientSecret, setClientSecret] = useState("");
	const router = useRouter();

	const totalTickets = Number(session.totalTickets);

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

	const orderBreakdown = JSON.stringify({
		bookingFee: bookingSubtotal.toFixed(2),
		subtotal: subtotal,
		taxes: totalTaxes,
		total: total,
	});

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND}/purchase`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: [{ id: "xl-tshirt" }], total: total }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	const submitHandler = async (seats) => {
		const transformSeats = seats.split(", ");
		for (let i = 0; i < transformSeats.length; i++) {
			try {
				await updateSeat(transformSeats[i]);
			} catch (error) {}
		}
		await sendEmailConfirmation();
		await deleteSession(sessionId);
		router.replace("/");
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
			<div className={styles.email}>
				<p className={styles["email-label"]}>
					Email
					<div className={styles.tooltip}>
						<IoMdInformationCircleOutline fontSize="medium" />
						<span className={styles.tooltiptext}>
							This will be the email address where we send your order
							confirmation
						</span>
					</div>
				</p>
				<p className={styles["email-value"]}>{session.email}</p>
			</div>
			<div className={styles.conditions}>
				<label>
					By proceeding with the payment, you acknowledge that all the
					information provided and the order details have been verified and that
					you accept that all tickets are final sale (no refunds).
				</label>
			</div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm
						session={session}
						show={show}
						movie={movie}
						orderDetails={orderBreakdown}
					/>
				</Elements>
			)}
		</div>
	);
}
