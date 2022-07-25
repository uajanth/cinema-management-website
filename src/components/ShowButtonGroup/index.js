import Image from "next/image";
import { useRouter } from "next/router";
import seatIcon from "../../../public/assets/seat-icon.svg";
import styles from "./ShowButtonGroup.module.scss";
import { useDispatch } from "react-redux";
import { showModal } from "../../app/modalSlice";

export default function ShowButtonGroup({ time, showId, disable }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const createNewSession = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/sessions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ showId: id }),
			});

			if (response.ok) {
				const session = await response.json();
				return session;
			}
			throw new Error();
		} catch (error) {
			console.log(error);
			return;
		}
	};

	const startBookingForShow = async (id) => {
		const session = await createNewSession(id);
		console.log(session);
		router.push(`/booking?sessionId=${session.id}`);
	};

	return (
		<div className={styles.container}>
			<button
				className={!disable ? styles.time : styles["disabled-time"]}
				onClick={!disable ? () => startBookingForShow(showId) : () => {}}
			>
				{time}
			</button>
			<button
				className={!disable ? styles.seat : styles["disabled-seat"]}
				onClick={
					!disable
						? () =>
								dispatch(showModal({ type: "preview-seats", info: { showId } }))
						: () => {}
				}
			>
				<Image
					src={seatIcon}
					alt=""
					width="16px"
					height="16px"
					style={{ marginTop: "0.1rem" }}
				/>
			</button>
		</div>
	);
}
