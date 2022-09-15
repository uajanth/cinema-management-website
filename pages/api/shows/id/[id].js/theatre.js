import connectMongo from "utils/connectMongo";
import Show from "models/show";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		case "GET":
			const { id } = req.params;
			try {
				const theatre = await Show.find({ _id: id }, "theatre");
				console.log(theatre);
				return res.status(200).json(theatre);
			} catch (error) {
				return res.status(504).send(`No theatre found for show.`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
