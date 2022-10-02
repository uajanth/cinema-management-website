import styles from "./NavDrawer.module.scss";
import Drawer from "react-modern-drawer";
import CinemasLocationCard from "../CinemasLocationCard";

export default function NavDrawer({ drawer, onClose }) {
	return (
		<Drawer
			open={drawer.state}
			overlayOpacity="0.75"
			onClose={() => onClose(drawer.type)}
			style={{ backgroundColor: "#0a0b0d" }}
			className={styles.drawer}
			direction="right"
		>
			<h2>{drawer.type === "theatres" ? "Select a theatre" : "Search"}</h2>
			{drawer.type === "theatres" && (
				<div className={styles.content}>
					<CinemasLocationCard
						name="Woodside Cinemas"
						address="1571 Sandhurst Cir, Scarborough, ON M1V 1V2"
						phone="(416) 299-1045"
						city="Scarborough"
					/>
					<div className={styles.box}>
						<p>Coming Soon</p>
					</div>
				</div>
			)}
			{drawer.type === "search" && (
				<>
					<div className={styles.content}>
						<input className={styles.search} type="search" />
						<div className={styles.box}>
							<p>Coming Soon</p>
						</div>
					</div>
				</>
			)}
		</Drawer>
	);
}
