/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["imdb-api.com", "drive.google.com"],
	},
};

module.exports = nextConfig;
