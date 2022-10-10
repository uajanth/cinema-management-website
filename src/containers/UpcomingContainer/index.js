import styles from "./UpcomingContainer.module.scss";
import Header from "../../components/Header";
import UpcomingMovieCard from "../../components/UpcomingCard";
import ErrorMessage from "../../components/ErrorMessage";
export default function UpcomingContainer({ movies }) {
	return (
		<div className={styles.container}>
			{movies === "No upcoming movies Found" && (
				<div style={{ marginTop: "1rem" }}>
					<ErrorMessage
						header="Sorry, no results were found"
						message="No upcoming movies were found. Please check back later for any updates."
					/>
				</div>
			)}
			{movies !== "No upcoming movies Found" && (
				<>
					<Header text="Upcoming Movies" color="#007DD8" />
					<div className={styles.content}>
						<div className={styles.box}>
							{movies?.map((movie, index) => (
								<UpcomingMovieCard
									key={index}
									id={movie._id}
									image={movie.posterLink}
									title={movie.title}
									trailerLink={movie.trailerLink}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
