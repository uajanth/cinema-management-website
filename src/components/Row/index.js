import styles from "./Row.module.scss";
import Seat from "../Seat";

function Row({ name, seats, onSelectSeat, disabled, totalTickets, readMode }) {
	return (
		<div className={styles.row}>
			<p
				style={{
					display: "inline",
					margin: "0 1rem 0 0",
					fontWeight: 600,
				}}
			>
				{name}
			</p>

			{seats.map((seat, index) => {
				if (seat.isAvailable === false && seat.status === "gap") {
					return <Seat key={index} space={true} />;
				} else {
					return (
						<Seat
							totalTickets={totalTickets}
							readMode={readMode}
							onClick={() => onSelectSeat(seat.label, seat.status)}
							key={index}
							id={seat.label}
							status={seat.status}
							disabled={disabled}
						/>
					);
				}
			})}
			<p
				style={{
					display: "inline",
					margin: "0 0 0 1rem",
					fontWeight: 600,
				}}
			>
				{name}
			</p>
		</div>
	);
}

export default Row;
