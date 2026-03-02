import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore missing static files that will be added later
				if (path.startsWith("/files/") || path.startsWith("/images/")) {
					console.warn(`Ignoring missing static file: ${path}`);
					return;
				}
				throw new Error(message);
			},
		},
	},
};

export default config;
