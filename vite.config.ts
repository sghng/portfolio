import yaml from "@modyfi/vite-plugin-yaml";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { wenkaiSubset } from "./vite-plugin-wenkai-subset";

export default defineConfig({
	plugins: [wenkaiSubset(), tailwindcss(), yaml(), sveltekit()],
});
