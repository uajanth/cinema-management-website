import styles from "./CheckoutProgress.module.scss";

export default function CheckoutProgress({ step }) {
	const fill =
		step == 1 ? "33%" : step == 2 ? "66%" : step == 3 ? "100%" : null;

	const message =
		step == 1
			? "Select Number of Tickets"
			: step == 2
			? "Select Your Seats"
			: step == 3
			? "Complete Your Purchase"
			: null;

	return (
		<div className={styles.container}>
			<p className={styles.step}>{`Step ${step} of 3`}</p>
			{message !== null && <h1 className={styles.header}>{message}</h1>}
			<div className={styles.bar}>
				{fill !== null && (
					<div className={styles.fill} style={{ width: fill }} />
				)}
			</div>
		</div>
	);
}
