import styles from "./SessionCounter.module.scss";
import { useEffect, useState, memo } from "react";

function SessionCounter({ expiresAt }) {
	const calculateTimeLeft = () => {
		let timeLeft = {};
		if (difference > 0) {
			timeLeft = {
				hours: Math.floor(difference / (1000 * 60 * 60)),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
			return timeLeft;
		}
	};

	const [difference, setDifference] = useState(1);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		setDifference(+new Date(expiresAt) - +new Date());
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	}, [timeLeft]);

	return (
		<div className={styles.container}>
			<h3>Time Left</h3>
			{/* watch for 0.00 on load */}
			{timeLeft && timeLeft.seconds != 0 && (
				<h2>{`${timeLeft?.minutes}:${timeLeft?.seconds < 10 ? "0" : ""}${
					timeLeft?.seconds
				}`}</h2>
			)}
		</div>
	);
}

export default memo(SessionCounter);
