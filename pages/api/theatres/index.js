import connectMongo from "../../../utils/connectMongo";
import Theatre from "../../../models/theatre";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		// GET theatres from database
		case "GET":
			try {
				const theatres = await Theatre.find();
				if (theatres.length < 1) {
					return res.status(200).json("No Theatres Found");
				}
				return res.status(200).json(theatres);
			} catch (error) {
				console.log(error);

				return res
					.status(504)
					.json("Unable to retrieve theatres from the database.");
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
