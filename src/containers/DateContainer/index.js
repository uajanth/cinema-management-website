import { useEffect, useState } from "react";
import styles from "./DateContainer.module.scss";
import { format, addDays, startOfToday } from "date-fns";

export default function DateContainer({ date }) {
	const [selectedDate, setSelectedDate] = useState(
		format(startOfToday(), "yyyy-MM-dd")
	);

	useEffect(() => {
		date(selectedDate);
	}, []);

	const day0 = startOfToday();
	const day1 = addDays(day0, 1);
	const day2 = addDays(day0, 2);
	const day3 = addDays(day0, 3);
	const day4 = addDays(day0, 4);

	const changeDateHandler = (event) => {
		event.preventDefault();
		setSelectedDate(event.target.value);
		date(event.target.value);
	};

	const formatDateValue = (date) => {
		return format(date, "yyyy-MM-dd");
	};

	return (
		<div className={styles.container}>
			<h3>Date</h3>
			<form>
				<select id="date" onChange={changeDateHandler} value={selectedDate}>
					{/* Check every value in select menu if it is in the past using datefns */}
					{/* Return an error if it is in the past */}
					<option value={formatDateValue(day0)}>Today</option>
					<option value={formatDateValue(day1)}>{format(day1, "PPPP")}</option>
					<option value={formatDateValue(day2)}>{format(day2, "PPPP")}</option>
					<option value={formatDateValue(day3)}>{format(day3, "PPPP")}</option>
					<option value={formatDateValue(day4)}>{format(day4, "PPPP")}</option>
				</select>
			</form>
		</div>
	);
}
