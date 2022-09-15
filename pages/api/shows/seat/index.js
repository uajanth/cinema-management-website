import connectMongo from "utils/connectMongo";
import Show from "models/show";

export default async function handler(req, res) {
	const { method } = req;
	connectMongo();

	switch (method) {
		case "PUT":
			const { id, seatId } = req.body;
			try {
				const seatRow = seatId[0];

				// Aggregation Pipeline to split theatre into documents for each row
				const rows = await Show.aggregate([
					{
						$match: {
							_id: mongoose.Types.ObjectId(id),
						},
					},
				])
					.unwind({
						path: "$theatre.rows",
					})
					.exec();

				// Row
				const matchingRow = [];

				rows.forEach((row, index) => {
					if (row.theatre.rows.name === seatRow) {
						matchingRow.push(Object.assign({}, row, { index }));
					}
				});

				const rowIndex = matchingRow[0].index;

				// Seat
				const seats = matchingRow[0].theatre.rows.seats;

				const matchingSeat = seats.filter((seat) => seat.label === seatId);

				const seatIndex = matchingSeat[0].index;

				const seatStatus = `theatre.rows.${rowIndex}.seats.${seatIndex}.status`;
				const seatIsAvailable = `theatre.rows.${rowIndex}.seats.${seatIndex}.IsAvailable`;

				// Update Seat Status and Availability
				const filter = {
					_id: mongoose.Types.ObjectId(id),
					"theatre.rows.seats.label": seatId,
				};

				const update = {
					$set: {
						[seatStatus]: "occupied",
						[seatIsAvailable]: false,
					},
				};

				const show = await Show.findOneAndUpdate(filter, update, { new: true });
				show.save();

				return res.status(200).json(show);
			} catch (error) {
				console.log(error);
				return res.status(504).json(`Unable to update seat`);
			}
			break;
		default:
			return res.status(400).json({ message: "Method type not supported" });
	}
}
