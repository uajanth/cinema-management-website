import { Schema, model, models } from "mongoose";

const ShowSchema = new Schema({
	date: { type: Schema.Types.Date },
	movie: { type: Schema.Types.ObjectId, ref: "Movie" },
	language: String,
	theatre: {
		theatre: String,
		maxRowLength: String,
		verticalSort: String,
		horizontalSort: String,
		rows: Array,
	},
	startTime: String,
	startTime12: String,
	endTime: String,
	intermissionLength: String,
	cleanupLength: String,
});

// Prevent a new model from being created again if it already exists
const Show = models.Show || model("Show", ShowSchema);

export default Show;
