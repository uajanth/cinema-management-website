import styles from "./Header.module.scss";

export default function Header({ text, color, isModal, onClose }) {
	return (
		<div className={styles.container}>
			<div className={styles.marker} style={{ backgroundColor: color }} />
			<div
				className={styles.text}
				style={{ borderTopRightRadius: isModal ? 0 : "0.4rem" }}
			>
				<h2
					style={{
						margin: 0,
						fontWeight: 600,
					}}
				>
					{text}
				</h2>
			</div>
			{isModal && (
				<div className={styles.close}>
					<span className={styles.x} onClick={onClose}>
						X
					</span>
				</div>
			)}
		</div>
	);
}
