import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";
import type { Plugin } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FONT_URL =
	"https://excalidraw.nyc3.cdn.digitaloceanspaces.com/fonts/Excalifont-Regular.woff2";
const CACHE_DIR = resolve(__dirname, "node_modules/.cache/excalifont-subset");
const OUTPUT_DIR = resolve(__dirname, "static/fonts");
const OUTPUT_FILE = resolve(OUTPUT_DIR, "Excalifont-subset.woff2");

// Characters we need: IYKYK
const CHARACTERS = "IYKYK";

async function fetchFont(): Promise<Buffer> {
	const cachedPath = resolve(CACHE_DIR, "Excalifont-Regular.woff2");

	if (existsSync(cachedPath)) {
		console.log("[excalifont-subset] using cached font");
		return readFileSync(cachedPath);
	}

	console.log("[excalifont-subset] downloading Excalifont...");
	const response = await fetch(FONT_URL);
	if (!response.ok) {
		throw new Error(`Font download error ${response.status}`);
	}
	const font = Buffer.from(await response.arrayBuffer());

	mkdirSync(CACHE_DIR, { recursive: true });
	writeFileSync(cachedPath, font);
	console.log(`[excalifont-subset] cached to ${cachedPath}`);

	return font;
}

async function buildSubset(): Promise<void> {
	const sourceFont = await fetchFont();
	const woff2 = await subsetFont(sourceFont, CHARACTERS, {
		targetFormat: "woff2",
	});

	mkdirSync(OUTPUT_DIR, { recursive: true });
	writeFileSync(OUTPUT_FILE, woff2);

	const kb = (woff2.byteLength / 1024).toFixed(1);
	console.log(`[excalifont-subset] ${CHARACTERS.length} chars → ${kb} kB`);
}

export function excalifontSubset(): Plugin {
	return {
		name: "excalifont-subset",

		async buildStart() {
			await buildSubset();
		},

		configureServer() {
			buildSubset().catch(console.error);
		},
	};
}
