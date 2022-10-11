import { useEffect, useState } from "react";
import styles from "./ShowtimeContainer.module.scss";
import Header from "../../components/Header";
import ShowCard from "../../components/ShowCard";
import DateContainer from "../DateContainer";
import { addDays, endOfDay, isPast } from "date-fns";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

export default function ShowtimeContainer({ movie, home }) {
	const [date, setDate] = useState("");
	const [shows, setShows] = useState(null);
	const [movies, setMovies] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData(date);
	}, [date]);

	const fetchShowsForDate = async (date) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND}/shows/date/${date}`
			);
			if (response.ok) {
				const shows = await response.json();
				if (shows.length === 0) {
					return [];
				}
				return shows;
			}
			throw new Error();
		} catch (error) {
			return [];
		}
	};

	const createMovieArray = async (movies) => {
		const movieIdArray = Array.from(new Set(movies?.map((movie) => movie._id)));

		// If movie prop exists
		if (movie) {
			return [movie._id];
		}

		return movieIdArray;
	};

	const filterShowsForMovies = async (shows) => {
		// Filter all shows for movies
		const movies = shows?.map((show) => show.movie);

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

					if (movies.length === 0) {
						return [];
					}

					return movies;
				}
				throw new Error();
			} catch (error) {
				return [];
			}
		}
		return [];
	};

	const fetchData = async (date) => {
		if (date !== "") {
			setLoading(true);
			// If the date has past then reset states of shows and movies and return an error
			if (isPast(addDays(endOfDay(new Date(date)), 1))) {
				setShows([]);
				setMovies([]);
			}
			const shows = await fetchShowsForDate(date);
			const moviesById = await filterShowsForMovies(shows);
			const movies = await fetchMoviesForDate(moviesById);

			setMovies(movies);

			if (home) {
				setShows(shows);
			}

			if (!home) {
				setShows(shows?.filter((show) => show?.movie?._id === moviesById[0]));
			}

			if (movies?.length === 0) {
				setMovies([]);
			}

			//Temporary Solution to prevent error message from flashing
			setTimeout(() => {
				setLoading(false);
			}, 100);

			return;
		}
		return;
	};

	function Showings() {
		if (loading) {
			return <Loader color="#007DD8" loading={loading} />;
		}

		if (!loading && shows?.length <= 0) {
			return (
				<div style={{ margin: "1rem 0" }}>
					<ErrorMessage
						header="Sorry, no results were found"
						message="No showtimes were found based on your selected date. Please choose an alternate date."
					/>
				</div>
			);
		}

		if (!loading && shows?.length > 0) {
			return movies?.map((movie, index) => {
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
						showtimes={shows?.filter((show) => show.movie._id == movie._id)}
						home={home}
					/>
				);
			});
		}
	}

	return (
		<div className={styles.container}>
			<Header text="Showtimes" color="#007DD8" />
			<DateContainer
				date={(date) => {
					setDate(date);
				}}
			/>
			<Showings />
		</div>
	);
}
