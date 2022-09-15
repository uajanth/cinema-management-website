import connectMongo from "../../../../utils/connectMongo";
import Show from "../../../../models/show";
import { addDays } from "date-fns";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		case "GET":
			const { date } = req.params;
			try {
				const shows = await Show.find({
					date: {
						$gte: new Date(date),
						$lt: new Date(addDays(new Date(date), 1)),
					},
				})
					.populate("movie")
					.exec();
				return res.status(200).json(shows);
			} catch (error) {
				console.log(error);
				return res
					.status(504)
					.json(`Unable to find any shows for the requested date.`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
