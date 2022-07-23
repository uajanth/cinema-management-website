import styles from "./DateContainer.module.scss";

export default function DateContainer() {
	return (
		<div className={styles.container}>
			<h3>Date</h3>
			<form>
				<select id="date">
					<option value={"test"}>{"Test"}</option>
				</select>
			</form>
		</div>
	);
}
