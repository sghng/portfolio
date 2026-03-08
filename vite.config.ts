import yaml from "@modyfi/vite-plugin-yaml";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { excalifontSubset } from "./vite-plugin-excalifont-subset";
import { wenkaiSubset } from "./vite-plugin-wenkai-subset";

export default defineConfig({
	plugins: [
		wenkaiSubset(),
		excalifontSubset(),
		tailwindcss(),
		yaml(),
		sveltekit(),
	],
});
