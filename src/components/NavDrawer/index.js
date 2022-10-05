import styles from "./NavDrawer.module.scss";
import Drawer from "react-modern-drawer";
import CinemasLocationCard from "../CinemasLocationCard";
import { useMediaQuery } from "@react-hook/media-query";

export default function NavDrawer({ drawer, onClose }) {
	const isGreaterThan320px = useMediaQuery(
		"only screen and (min-width: 320px)"
	);

	return (
		<Drawer
			open={drawer.state}
			overlayOpacity="0.75"
			onClose={() => onClose(drawer.type)}
			style={{
				backgroundColor: "#0a0b0d",
				width: isGreaterThan320px ? "320px" : "100vw",
			}}
			className={styles.drawer}
			direction="right"
		>
			<div className={styles.top}>
				<h2>{drawer.type === "theatres" ? "Select a theatre" : "Search"}</h2>
				<button onClick={() => onClose(drawer.type)}>X</button>
			</div>
			{drawer.type === "theatres" && (
				<div className={styles.content}>
					<div className={styles.wrapper}>
						<CinemasLocationCard
							isSelected={true}
							name="Woodside Cinemas"
							address="1571 Sandhurst Cir, Scarborough, ON M1V 1V2"
							phone="(416) 299-1045"
							city="Scarborough"
						/>
						<CinemasLocationCard
							name="York Cinemas"
							address="115 York Blvd, Richmond Hill, ON L4B 3B4"
							phone="(905) 707-3456"
							city="Richmond Hill"
						/>
						<CinemasLocationCard
							name="Albion Cinemas"
							address="1530 Albion Rd #9, Etobicoke, ON M9V 1B4"
							phone="(416) 742-1765"
							city="Etobicoke"
						/>
						<CinemasLocationCard
							name="Central Parkway Cinema"
							address="377 Burnhamthorpe Rd E, Mississauga, ON L5A 3Y1"
							phone="(905) 277-2345"
							city="Mississauga"
						/>
					</div>
				</div>
			)}
			{drawer.type === "search" && (
				<>
					<div className={styles.content}>
						<input className={styles.search} type="search" />
						{/* <div className={styles.box}>
							<p>Coming Soon</p>
						</div> */}
					</div>
				</>
			)}
		</Drawer>
	);
}
