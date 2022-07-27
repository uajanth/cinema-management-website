const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["imdb-api.com", "drive.google.com"],
	},
	sassOptions: {
		includePaths: [
			path.join(__dirname, "styles"),
			path.join(__dirname, "components/*"),
		],
	},
	experimental: {
		reactMode: "concurrent",
	},
};

module.exports = nextConfig;
