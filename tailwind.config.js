/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/public/**/*.{html,js}", "./src/views/**/*.ejs"],
	theme: {
		extend: {},
	},
	plugins: [
		{
			tailwindcss: {},
			autoprefixer: {},
		},
	],
};
