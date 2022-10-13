import styles from "./NavDrawer.module.scss";
import Drawer from "react-modern-drawer";
import { useRef } from "react";
import { useRouter } from "next/router";
import CinemasLocationCard from "../CinemasLocationCard";
import { IoSearch } from "react-icons/io5";
import { useMediaQuery } from "@react-hook/media-query";
import { useState } from "react";

export default function NavDrawer({ drawer, onClose }) {
	const [search, setSearch] = useState({ state: false, results: null });
	const [searchValue, setSearchValue] = useState("");
	const isGreaterThan320px = useMediaQuery(
		"only screen and (min-width: 320px)"
	);
	const searchRef = useRef() || {};
	const router = useRouter();

	const searchHandler = async (event) => {
		setSearch({ state: false, results: null });
		if (searchRef.current.value.trim().length > 0) {
			try {
				const moviesResponse = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND}/movies`
				);
				if (moviesResponse.ok) {
					const movies = await moviesResponse.json();

					const filteredMovies = movies.filter((movie) =>
						movie?.title
							.toLowerCase()
							.includes(searchRef.current.value.toLowerCase())
					);

					setSearch({ state: true, results: filteredMovies });
					return;
				}
				throw new Error();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const closeHandler = () => {
		setSearch({ state: false, results: null });
		if (drawer.type === "search") {
			setSearchValue("");
		}
		onClose(drawer.type);
		return;
	};

	const selectResultHandler = async (movie) => {
		await router.push(`/movie/${movie?._id}`);
		closeHandler();
	};

	return (
		<Drawer
			open={drawer.state}
			overlayOpacity="0.75"
			onClose={closeHandler}
			style={{
				backgroundColor: "#0a0b0d",
				width: isGreaterThan320px ? "320px" : "100vw",
			}}
			className={styles.drawer}
			direction="right"
		>
			<div className={styles.top}>
				<h2>{drawer.type === "theatres" ? "Select a theatre" : "Search"}</h2>
				<button onClick={closeHandler}>X</button>
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
							name="Central Parkway Cinemas"
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
						<div className={styles.search}>
							<input
								type="search"
								ref={searchRef}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										searchHandler();
									}
								}}
								onChange={(event) => setSearchValue(event.target.value)}
								value={searchValue}
								placeholder="Search for a movie"
							/>
							<div className={styles.icon}>
								<IoSearch onClick={searchHandler} fontSize="30px" />
							</div>
						</div>
						{search.state && (
							<div className={styles.wrapper} style={{ gap: "0.4rem" }}>
								<h4
									style={{ marginTop: "1rem" }}
								>{`Results ${search.results.length}`}</h4>
								{search.results.map((movie, index) => (
									<p key={index} onClick={() => selectResultHandler(movie)}>
										{movie.title}
									</p>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</Drawer>
	);
}
