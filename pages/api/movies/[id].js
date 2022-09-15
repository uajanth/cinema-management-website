import connectMongo from "utils/connectMongo";
import Movie from "models/movie.js";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	// GET movie(s) from database with ID
	switch (method) {
		case "GET":
			{
				let { id } = req.query;
				// transform id(s) into a list
				const ids = id.split(",");

				// // if there is more than 1 id
				if (ids.length > 1) {
					try {
						const movies = await Movie.find({ _id: { $in: ids } });
						return res.status(200).json(movies);
					} catch (error) {
						console.log(error);

						return res
							.status(504)
							.json("Unable to retrieve movies from the database.");
					}
				}

				try {
					const movie = await Movie.findById(ids[0]);

					return res.status(200).json([movie]);
				} catch (error) {
					console.log(error);
					return res
						.status(504)
						.json("Unable to retrieve movie from the database.");
				}
			}
			break;
		// PUT movie in database
		case "PUT":
			{
				const {
					id,
					title,
					language,
					cast,
					director,
					trailerLink,
					status,
					rating,
					posterLink,
				} = req.body;

				try {
					await Movie.findByIdAndUpdate(
						{ _id: id },
						{
							title,
							language,
							cast,
							director,
							trailerLink,
							status,
							rating,
							posterLink,
						}
					);

					return res.status(200).json(`Successfully updated ${title}!`);
				} catch (error) {
					console.log(error);

					return res.status(504).json(`Unable to update movie.`);
				}
			}
			break;
		// DELETE movie from database with ID
		case "DELETE":
			let { id } = req.query;

			// transform id(s) into a list
			if (id.includes(",")) {
				id = id.split(",");
				try {
					for (let i = 0; i < id.length; i++) {
						await Movie.findByIdAndDelete(id[i]);
					}
					return res.status(200).json(`Successfully deleted movies!`);
				} catch (error) {
					console.log(error);

					return res.status(504).json("Unable to delete movies.");
				}
			}

			try {
				await Movie.findByIdAndDelete(id);
				return res.status(200).json(`Successfully deleted movie!`);
			} catch (error) {
				console.log(error);

				return res.status(504).json("Unable to delete movie.");
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
