import mongoose from "mongoose";

const connectMongo = async () => {
	try {
		mongoose.connect(process.env.MONGODB_URI);
	} catch (err) {
		console.log(err);
	}
};

export default connectMongo;
