import React, { useEffect, useState } from "react";
import { default as Loader } from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import styles from "./CheckoutForm.module.scss";
import { format } from "date-fns";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ session, show, movie, orderDetails }) {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const fetchSeatAvailability = async (id) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/shows/seat/${session.showId}/${id}`
			);

			if (response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error();
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const allSeatsAvailable = async () => {
		const transformSeats = session.seatsSelected.split(", ");

		for (let i = 0; i < transformSeats.length; i++) {
			const isAvailable = await fetchSeatAvailability(transformSeats[i]);
			if (!isAvailable) {
				return false;
			}
		}
		return true;
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

	const sendEmailConfirmation = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/sales`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					emailAddress: session?.email,
					posterLink: movie?.posterLink,
					movieTitle: movie?.title,
					showDate: format(new Date(show?.date), "LLLL dd, yyyy"),
					startTime: show?.startTime12,
					theatre: show?.theatre?.theatre,
					totalTickets: session?.totalTickets,
					selectedSeats: session?.seatsSelected,
					ticketsByGroup: session?.ticketsByGroup,
					orderBreakdown: orderDetails,
				}),
			});

			if (response.ok) {
				const responseMessage = await response.json();
				console.log(responseMessage);
				return;
			}

			throw new Error();
		} catch (error) {
			console.log(error);
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

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const seatAvailabilityCheck = await allSeatsAvailable();

		if (seatAvailabilityCheck) {
			// Process payment request through Stripe
			if (!stripe || !elements) {
				// Stripe.js has not yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return;
			}

			setIsLoading(true);

			const payment = await stripe.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "/",
				},
				redirect: "if_required",
			});

			// This point will only be reached if there is an immediate error when
			// confirming the payment. Otherwise, your customer will be redirected to
			// your `return_url`. For some payment methods like iDEAL, your customer will
			// be redirected to an intermediate site first to authorize the payment, then
			// redirected to the `return_url`.

			if (payment.paymentIntent) {
				setMessage("Success");
			} else {
				if (
					payment.error.type === "card_error" ||
					payment.error.type === "validation_error"
				) {
					setMessage(payment.error.message);
				}
			}

			// Update status of seats in the database
			const transformSeats = session.seatsSelected.split(", ");
			for (let i = 0; i < transformSeats.length; i++) {
				try {
					await updateSeat(transformSeats[i]);
				} catch (error) {}
			}

			// Send email
			await sendEmailConfirmation();

			// Delete session
			await deleteSession(session._id);

			await router.replace("/");

			setIsLoading(false);

			return;
		}

		return alert("Seats are no longer available");
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			{message && <div className={styles.message}>{message}</div>}
			<button
				className={styles.button}
				disabled={isLoading || !stripe || !elements}
				id="submit"
			>
				<span id="button-text">
					{isLoading ? <Loader loading color="#ffffff" size={20} /> : "Submit"}
				</span>
			</button>
			{/* Show any error or success messages */}
		</form>
	);
}
