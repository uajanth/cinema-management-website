import { Schema, model, models } from "mongoose";

const TheatreSchema = new Schema({
	theatre: String,
	maxRowLength: String,
	verticalSort: String,
	horizontalSort: String,
	rows: Array,
});

// Prevent a new model from being created again if it already exists
const Theatre = models.Theatre || model("Theatre", TheatreSchema);

export default Theatre;
