import Link from "next/link";
import styles from "./UpcomingMovieCard.module.scss";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showModal } from "../../app/modalSlice";
import { useRouter } from "next/router";

export default function UpcomingMovieCard({ id, image, title, trailerLink }) {
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.skeleton}>
				<img
					className={styles.image}
					src={image}
					alt={title}
					onClick={() => {
						router.push(`/movie/${id}`);
					}}
				/>
			</div>
			<div className={styles.details}>
				<h2
					className={styles.title}
					onClick={() => {
						router.push(`/movie/${id}`);
					}}
				>
					{title}
				</h2>
				{!trailerLink.includes("undefined") && (
					<div className={styles.trailer}>
						<a
							className={styles.link}
							onClick={() => {
								dispatch(
									showModal({
										type: "view-trailer",
										info: { title, trailerLink },
									})
								);
							}}
						>
							<IoPlayCircle fontSize="24" />
							<h4>View Trailer</h4>
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
