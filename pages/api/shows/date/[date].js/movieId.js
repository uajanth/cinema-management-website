import connectMongo from "../../../utils/connectMongo";
import Show from "../../../models/show";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		case "GET":
			const { date, movieId } = req.params;

			try {
				const shows = await Show.find(
					{ date: date, movie: movieId },
					{
						_id: 1,
						language: 1,
						startTime: 1,
						startTime12: 1,
						movie: 1,
					}
				)
					.populate({ path: "movie", select: "_id" })
					.exec();
				return res.status(200).json(shows);
			} catch (error) {
				console.log(error);
				return res
					.status(504)
					.json(`Unable to find any show for ${movieId} on ${date}`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
