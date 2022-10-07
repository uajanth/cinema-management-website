import { useEffect, useState } from "react";
import styles from "./ShowtimeContainer.module.scss";
import Header from "../../components/Header";
import DateContainer from "../DateContainer";
import ShowCard from "../../components/ShowCard";
import { format, addDays, endOfDay, isPast, startOfToday } from "date-fns";
import ErrorMessage from "../../components/ErrorMessage";

export default function ShowtimeContainer({ movie, home, date }) {
	const [shows, setShows] = useState([]);
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(false);
		fetchShows(format(startOfToday(), "yyyy-MM-dd"));
	}, [movie]);

	const fetchShowsForDate = async (date) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/shows/date/${date}`
			);
			if (response.ok) {
				const shows = await response.json();
				// Save shows as state
				setShows(shows);
				return shows;
			}
			throw new Error();
		} catch (error) {
			return;
		}
	};

	const createMovieArray = async (movies) => {
		let movieIdArray = [];

		for (let i = 0; i < movies.length; i++) {
			if (!movieIdArray.includes(movies[i]._id)) {
				movieIdArray.push(movies[i]._id);
			}
		}

		// If movie prop exists
		if (movie) {
			if (movieIdArray.includes(movie._id)) {
				return [movie._id];
			}
			return [];
		}

		return movieIdArray;
	};

	const filterShowsForMovies = async (shows) => {
		// Filter all shows for movies
		const movies = [];
		shows?.forEach((show) => movies.push(show.movie));
		// Filter all movies for movies
		const moviesById = await createMovieArray(movies);
		return moviesById;
	};

	const fetchMoviesForDate = async (ids) => {
		if (ids.length > 0) {
			// Sanitize request input as a string
			const id = ids.join();
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND}/movies/id/${id}`
				);
				if (response.ok) {
					const movies = await response.json();
					setMovies(movies);
					return movies;
				}
				throw new Error();
			} catch (error) {
				return;
			}
		}
		return [];
	};

	const fetchShows = async (date) => {
		// If the date has past then reset states of shows and movies and return an error
		if (isPast(addDays(endOfDay(new Date(date)), 1))) {
			setError(true);
			setShows([]);
			setMovies([]);
			return "Invalid Date";
		}
		const shows = await fetchShowsForDate(date);
		const moviesById = await filterShowsForMovies(shows);
		const movies = await fetchMoviesForDate(moviesById);
		setMovies(movies);

		if (movies?.length === 0) {
			setError(true);
		}

		return;
	};

	return (
		<div className={styles.container}>
			<Header text="Showtimes" color="#007DD8" />
			<DateContainer
				date={async (date) => {
					return await fetchShows(date);
				}}
			/>
			{error && movies.length <= 0 && (
				<div style={{ margin: "1rem 0" }}>
					<ErrorMessage
						header="Sorry, no results were found"
						message="No showtimes were found based on your selected date. Please choose an alternate date."
					/>
				</div>
			)}
			{movies?.length > 0 &&
				movies.map((movie, index) => {
					return (
						<ShowCard
							key={index}
							index={index}
							id={movie._id}
							title={movie.title}
							language={movie.language}
							cast={movie.cast}
							director={movie.director}
							rating={movie.rating}
							runtime={movie.runtimeStr}
							trailerLink={movie.trailerLink}
							posterLink={movie.posterLink}
							showtimes={shows.filter((show) => show.movie._id == movie._id)}
							home={home}
						/>
					);
				})}
		</div>
	);
}
