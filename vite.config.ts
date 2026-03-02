import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import yaml from "@modyfi/vite-plugin-yaml";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), yaml(), sveltekit()],
});
