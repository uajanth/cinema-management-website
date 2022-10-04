import Header from "../Header";
import styles from "./Modal.module.scss";
import { useDispatch } from "react-redux";
import { hideModal } from "../../app/modalSlice";
import { useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";

export default function Modal({ header, color, children }) {
	const dispatch = useDispatch();
	const isGreaterThan320px = useMediaQuery(
		"only screen and (min-width: 320px)"
	);

	return (
		<div>
			<div
				className={styles.backdrop}
				onClick={() => {
					dispatch(hideModal());
				}}
			>
				<div
					className={styles.foreground}
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					<Header text={header} color={color} />

					<div className={styles.content}>
						{isGreaterThan320px ? (
							children
						) : (
							<p style={{ margin: 0, padding: "1rem", fontSize: "0.6rem" }}>
								Screen size too small. Try rotating your screen or use another
								device.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
