import Header from "../Header";
import styles from "./Modal.module.scss";
import { useDispatch } from "react-redux";
import { hideModal } from "../../app/modalSlice";

export default function Modal({ header, color, children }) {
	const dispatch = useDispatch();

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
					<div className={styles.content}>{children}</div>
				</div>
			</div>
		</div>
	);
}
