import yaml from "@modyfi/vite-plugin-yaml";
import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { excalifontSubset } from "./vite-plugin-excalifont-subset.ts";
import { monolisaSubset } from "./vite-plugin-monolisa-subset.ts";
import { wenkaiSubset } from "./vite-plugin-wenkai-subset.ts";

export default defineConfig({
	plugins: [
		wenkaiSubset(),
		excalifontSubset(),
		monolisaSubset(),
		tailwindcss(),
		yaml(),
		// SvelteKit 3: configuration moved from svelte.config.js into the plugin,
		// with the old `kit` namespace flattened away
		sveltekit({
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
		}),
	],
});
