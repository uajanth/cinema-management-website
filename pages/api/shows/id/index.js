import connectMongo from "utils/connectMongo";
import Show from "models/show";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		// GET a specific show with an id from database
		case "GET":
			{
				const { id } = req.params;
				try {
					const show = await Show.find({ _id: id }).populate("movie").exec();
					return res.status(200).json(show);
				} catch (error) {
					console.log(error);
					return res.status(504).send("No show found.");
				}
			}
			break;
		case "DELETE":
			{
				let { id } = req.params;

				// transform id(s) into a list
				if (id.includes(",")) {
					id = id.split(",");
					try {
						for (let i = 0; i < id.length; i++) {
							await Show.findByIdAndDelete(id[i]);
						}
						return res.status(200).json(`Successfully deleted shows!`);
					} catch (error) {
						console.log(error);

						return res.status(504).json("Unable to delete shows.");
					}
				}

				try {
					await Show.findByIdAndDelete(id);
					return res.status(200).json(`Successfully deleted show!`);
				} catch (error) {
					console.log(error);

					return res.status(504).json("Unable to delete show.");
				}
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
