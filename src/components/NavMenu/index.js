import styles from "./NavMenu.module.scss";
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

export default function NavMenu() {
	return (
		<div className={styles.container}>
			<Link id="tickets" href="/" passHref>
				<a className={styles.link}>
					<IoTicketOutline className={styles.icon} />
					<IoTicket className={styles.icon2} />
					Tickets
				</a>
			</Link>
			<Link id="theatres" href="/" passHref>
				<a className={styles.link}>
					<IoLocationOutline className={styles.icon} />
					<IoLocation className={styles.icon2} />
					Theatres
				</a>
			</Link>
			<Link id="search" href="/" passHref>
				<a className={styles.link}>
					<IoSearchOutline className={styles.icon} />
					<IoSearch className={styles.icon2} />
					Search
				</a>
			</Link>
			<Link id="upcoming" href="/upcoming" passHref>
				<a className={styles.link}>
					<IoCalendarOutline className={styles.icon} />
					<IoCalendar className={styles.icon2} />
					Upcoming
				</a>
			</Link>
		</div>
	);
}
