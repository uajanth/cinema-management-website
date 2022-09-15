import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema({
	title: String,
	language: String,
	cast: String,
	director: String,
	trailerLink: String,
	status: String,
	rating: String,
	runtime: Number,
	runtimeStr: String,
	posterLink: String,
});

// Prevent a new model from being created again if it already exists
const Movie = models.Movie || model("Movie", MovieSchema);

export default Movie;
