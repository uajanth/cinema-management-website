import Image from "next/image";
import { useRouter } from "next/router";
import seatIcon from "../../../public/assets/seat-icon.svg";
import styles from "./ShowButtonGroup.module.scss";
import { useDispatch } from "react-redux";
import { showModal } from "../../app/modalSlice";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function ShowButtonGroup({ showId, title, time, disable }) {
	const [date, setDate] = useState();
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		getShowDate();
	}, [showId]);

	const getShowDate = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/shows/id/${showId}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			if (response.ok) {
				const data = await response.json();
				setDate(format(new Date(data[0].date), "PPP"));
				return;
			}
			throw new Error();
		} catch (error) {
			return;
		}
	};

	const createNewSession = async (id) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/sessions`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ showId: id }),
				}
			);

			if (response.ok) {
				const session = await response.json();
				return session;
			}
			throw new Error();
		} catch (error) {
			return;
		}
	};

	const startBookingForShow = async (id) => {
		const session = await createNewSession(id);
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
								dispatch(
									showModal({
										type: "preview-seats",
										info: { showId, title, date, time },
									})
								)
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
