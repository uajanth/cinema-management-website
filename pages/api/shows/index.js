import connectMongo from "../../../utils/connectMongo";
import Show from "../../../models/show";
import Theatre from "../../../models/theatre";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		// GET shows from database
		case "GET":
			try {
				const shows = await Show.find()
					.sort({ date: 1, startTime: 1 })
					.populate("movie")
					.exec();

				return res.status(200).json(shows);
			} catch (error) {
				console.log(error);

				return res
					.status(504)
					.json("Unable to retrieve shows from the database.");
			}
			break;
		// POST show to database
		case "POST":
			const {
				date,
				movieId,
				language,
				theatre,
				startTime,
				endTime,
				intermissionLength,
				cleanupLength,
			} = req.body;

			const formatTime = (time) => {
				// Example of input -> "18:00"
				const [hour, min] = time.split(":");
				const formattedTime = [];

				if (hour == 0) {
					return `12:${min} AM`;
				} else if (hour == 12) {
					return `12:${min} PM`;
				} else if (hour < 12) {
					return `${hour}:${min} AM`;
				} else {
					return `${hour - 12}:${min} PM`;
				}
			};

			try {
				const show = new Show({
					date: new Date(date),
					movie: movieId,
					language,
					startTime,
					startTime12: formatTime(startTime),
					intermissionLength,
					endTime,
					cleanupLength,
					theatre,
				});

				show.theatre = await Theatre.findOne(
					{ theatre },
					{
						_id: 0,
						theatre: 1,
						maxRowLength: 1,
						verticalSort: 1,
						horizontalSort: 1,
						rows: 1,
					}
				);

				show.set("_id", undefined, { strict: false });

				show.save();

				return res.status(200).json(`Successfully Added Show!`);
			} catch (error) {
				console.log(error);

				return res.status(504).json(`Unable to add show.`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
