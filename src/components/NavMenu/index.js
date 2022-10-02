import styles from "./NavMenu.module.scss";
import { useState } from "react";
import {
	IoTicketOutline,
	IoTicket,
	IoLocationOutline,
	IoLocation,
	IoSearchOutline,
	IoSearch,
	IoCalendarOutline,
	IoCalendar,
} from "react-icons/io5";
import Link from "next/link";
import NavDrawer from "../NavDrawer";

export default function NavMenu() {
	const [drawer, setDrawer] = useState({ state: false, type: false });

	const toggleDrawer = (type) => {
		setDrawer((prev) => {
			return {
				state: !prev.state,
				type,
			};
		});
	};

	return (
		<>
			<div className={styles.container}>
				<Link id="tickets" href="/" passHref>
					<a className={styles.link}>
						<IoTicketOutline className={styles.icon} />
						<IoTicket className={styles.icon2} />
						Tickets
					</a>
				</Link>
				<a
					id="theatres"
					onClick={() => {
						toggleDrawer("theatres");
					}}
					className={styles.link}
				>
					<IoLocationOutline className={styles.icon} />
					<IoLocation className={styles.icon2} />
					Theatres
				</a>

				<a
					id="search"
					onClick={() => {
						toggleDrawer("search");
					}}
					className={styles.link}
				>
					<IoSearchOutline className={styles.icon} />
					<IoSearch className={styles.icon2} />
					Search
				</a>
				<Link id="upcoming" href="/upcoming" passHref>
					<a className={styles.link}>
						<IoCalendarOutline className={styles.icon} />
						<IoCalendar className={styles.icon2} />
						Upcoming
					</a>
				</Link>
			</div>
			<NavDrawer
				drawer={drawer}
				onClose={(type) => setDrawer({ state: false, type })}
			/>
		</>
	);
}
