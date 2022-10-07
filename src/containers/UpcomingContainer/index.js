import styles from "./UpcomingContainer.module.scss";
import Header from "../../components/Header";
import UpcomingMovieCard from "../../components/UpcomingCard";
export default function UpcomingContainer({ movies }) {
	return (
		<div className={styles.container}>
			<Header text="Upcoming Movies" color="#007DD8" />
			<div className={styles.content}>
				<div className={styles.box}>
					{movies.map((movie, index) => (
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
		</div>
	);
}
