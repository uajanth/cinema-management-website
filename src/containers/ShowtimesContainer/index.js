import { useState } from "react";
import styles from "./ShowtimeContainer.module.scss";
import Header from "../../components/Header";
import DateContainer from "../DateContainer";
import ShowCard from "../../components/ShowCard";

export default function ShowtimeContainer() {
	const [shows, setShows] = useState([]);
	const [uniqueMovieIds, setUniqueMovieIds] = useState([]);
	const [movies, setMovies] = useState([]);

	const fetchShowsForDate = async (date) => {
		try {
			const response = await fetch(`http://localhost:3000/shows/date/${date}`);
			if (response.ok) {
				const shows = await response.json();
				// Save shows as state
				setShows(shows);
				return shows;
			}
			throw new Error();
		} catch (error) {
			console.log(error);
			return;
		}
	};

	const createUniqueMovieArray = async (movies) => {
		const movieIdArray = [];
		for (let i = 0; i < movies.length; i++) {
			if (!movieIdArray.includes(movies[i]._id)) {
				movieIdArray.push(movies[i]._id);
			}
		}
		return movieIdArray;
	};

	const filterShowsForUniqueMovies = async (shows) => {
		// Filter all shows for movies
		const movies = [];
		shows.forEach((show) => movies.push(show.movie));
		// Filter all movies for unique movies
		const uniqueMoviesById = await createUniqueMovieArray(movies);
		setUniqueMovieIds(uniqueMoviesById);
		return uniqueMoviesById;
	};

	const fetchMoviesForDate = async (ids) => {
		// Sanitize request input as a string
		const id = ids.join();
		try {
			const response = await fetch(`http://localhost:3000/movies/id/${id}`);
			if (response.ok) {
				const movies = await response.json();
				setMovies(movies);
				return movies;
			}
			throw new Error();
		} catch (error) {
			console.log(error);
			return;
		}
	};

	return (
		<div className={styles.container}>
			<Header text="Showtimes &amp; Tickets" color="#007DD8" />
			<DateContainer
				date={async (date) => {
					const shows = await fetchShowsForDate(date);
					const uniqueMoviesById = await filterShowsForUniqueMovies(shows);
					const movies = await fetchMoviesForDate(uniqueMoviesById);
					setMovies(movies);
				}}
			/>
			{movies?.length > 0 &&
				movies.map((movie, index) => {
					return (
						<ShowCard
							key={index}
							index={index}
							title={movie.title}
							language={movie.language}
							cast={movie.cast}
							director={movie.director}
							rating={movie.rating}
							runtime={movie.runtimeStr}
							trailerLink={movie.trailerLink}
							posterLink={movie.posterLink}
							showtimes={shows.filter((show) => show.movie._id == movie._id)}
						/>
					);
				})}
		</div>
	);
}
