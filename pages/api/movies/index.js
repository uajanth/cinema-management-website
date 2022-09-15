import connectMongo from "../../../utils/connectMongo";
import Movie from "../../../models/movie";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		// GET movies from database
		case "GET":
			try {
				const movies = await Movie.find();
				if (movies.length < 1) {
					return res.status(200).json("No Movies Found");
				}
				return res.status(200).json(movies);
			} catch (error) {
				console.log(error);

				return res
					.status(504)
					.json("Unable to retrieve movies from the database.");
			}
			break;
		// POST movie to database
		case "POST":
			const {
				title,
				language,
				cast,
				director,
				trailerLink,
				status,
				rating,
				runtime,
				runtimeStr,
				posterLink,
			} = req.body;

			try {
				const movie = new Movie({
					title,
					language,
					cast,
					director,
					trailerLink,
					status,
					rating,
					runtime,
					runtimeStr,
					posterLink,
				});

				movie.save();

				return res.status(200).json(`Successfully added ${title}!`);
			} catch (error) {
				console.log(error);

				return res.status(504).json(`Unable to add movie.`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
