import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";
import type { Plugin, ViteDevServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SRC_DIR = resolve(__dirname, "src");
const CACHE_DIR = resolve(__dirname, "node_modules/.cache/monolisa-subset");
const OUTPUT_DIR = resolve(__dirname, "static/fonts");
const GENERATED_CSS = resolve(
	__dirname,
	"src/lib/generated/monolisa-subset.css",
);

const BUCKET = "https://bucket.sgh.ng";
const FAMILIES = [
	{ name: "MonoLisaText", css: "/monolisatext.css", folder: "monolisatext" },
	{ name: "MonoLisaCode", css: "/monolisacode.css", folder: "monolisacode" },
];

/*
 * Characters to always include in the subset, on top of every character found
 * in the site's source (data YAML + Svelte templates). Keeping printable ASCII
 * and common typographic characters means routine text edits never render in
 * a fallback font even before the subset is regenerated.
 */
const BASE_CHARS = [
	...Array.from({ length: 95 }, (_, i) => String.fromCharCode(0x20 + i)),
	"–—‘’“”…·•©®™°±×÷←→↑↓✓",
].join("");

interface Slice {
	index: number;
	file: string; // e.g. "0-MonoLisaText-normal.woff2"
	style: "normal" | "italic";
	range: string; // unicode-range value
}

function collectCharacters(): string {
	const chars = new Set<string>(BASE_CHARS);
	const walk = (dir: string) => {
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			const p = resolve(dir, entry.name);
			if (entry.isDirectory()) {
				walk(p);
			} else if (/\.(svelte|yaml)$/.test(entry.name)) {
				for (const ch of readFileSync(p, "utf8")) chars.add(ch);
			}
		}
	};
	walk(SRC_DIR);
	return [...chars].join("");
}

function parseSlices(css: string): Slice[] {
	const re =
		/@font-face\s*\{[^}]*?url\(([^)]+)\)[^}]*?font-style:\s*(\w+)[^}]*?unicode-range:\s*([^;]+);/gs;
	const slices: Slice[] = [];
	let m: RegExpExecArray | null;
	while ((m = re.exec(css)) !== null) {
		const file = m[1].split("/").pop()!;
		const index = Number(file.match(/^(\d+)-/)?.[1]);
		slices.push({ index, file, style: m[2] as Slice["style"], range: m[3] });
	}
	return slices;
}

/** Characters from `chars` that fall inside a CSS unicode-range value */
function charsInRange(range: string, chars: string): string {
	const parts = range.split(",").map((p) => {
		const m = p.trim().match(/^U\+([0-9a-f]+)(?:-([0-9a-f]+))?$/i);
		return m ? [parseInt(m[1], 16), parseInt(m[2] ?? m[1], 16)] : null;
	});
	const used = new Set<string>();
	outer: for (const ch of chars) {
		const cp = ch.codePointAt(0)!;
		for (const part of parts) {
			if (part && cp >= part[0] && cp <= part[1]) {
				used.add(ch);
				continue outer;
			}
		}
	}
	return [...used].join("");
}

/** Fetch with retries — CI builders share egress IPs that can hit transient 5xx/429s */
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
	for (let attempt = 1; ; attempt++) {
		const res = await fetch(url);
		if (res.ok || attempt === retries) return res;
		if (res.status < 500 && res.status !== 429) return res;
		console.warn(
			`[monolisa-subset] fetch got ${res.status}, retrying (${attempt}/${retries - 1})…`,
		);
		await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
	}
}

async function fetchText(url: string): Promise<string> {
	const res = await fetchWithRetry(url);
	if (!res.ok) throw new Error(`Fetch error ${res.status}: ${url}`);
	return res.text();
}

async function fetchFont(url: string, cachePath: string): Promise<Buffer> {
	if (existsSync(cachePath)) return readFileSync(cachePath);
	const res = await fetchWithRetry(url);
	if (!res.ok) throw new Error(`Fetch error ${res.status}: ${url}`);
	const buf = Buffer.from(await res.arrayBuffer());
	mkdirSync(dirname(cachePath), { recursive: true });
	writeFileSync(cachePath, buf);
	return buf;
}

async function buildSubset(): Promise<void> {
	const chars = collectCharacters();
	const blocks: string[] = [];

	for (const family of FAMILIES) {
		const css = await fetchText(BUCKET + family.css);
		const slices = parseSlices(css).filter((s) => charsInRange(s.range, chars));

		for (const slice of slices) {
			const subsetChars = charsInRange(slice.range, chars);
			const outName = slice.file;
			const source = await fetchFont(
				`${BUCKET}/${family.folder}/${slice.file}`,
				resolve(CACHE_DIR, outName),
			);
			const woff2 = await subsetFont(source, subsetChars, {
				targetFormat: "woff2",
			});
			mkdirSync(OUTPUT_DIR, { recursive: true });
			writeFileSync(resolve(OUTPUT_DIR, outName), woff2);
			const kb = (woff2.byteLength / 1024).toFixed(1);
			console.log(
				`[monolisa-subset] ${family.name} #${slice.index} ${slice.style}: ${subsetChars.length} chars → ${kb} kB`,
			);
			blocks.push(
				"@font-face {",
				`\tsrc: url("/fonts/${outName}") format("woff2");`,
				`\tfont-family: "${family.name}";`,
				"\tfont-weight: 100 900;",
				`\tfont-style: ${slice.style};`,
				"\tfont-display: swap;",
				`\tunicode-range: ${slice.range};`,
				"}",
			);
		}
	}

	mkdirSync(dirname(GENERATED_CSS), { recursive: true });
	writeFileSync(
		GENERATED_CSS,
		"/* Generated by vite-plugin-monolisa-subset.ts — do not edit */\n" +
			blocks.join("\n") +
			"\n",
	);
}

export function monolisaSubset(): Plugin {
	let timer: ReturnType<typeof setTimeout> | undefined;

	const rebuild = (server?: ViteDevServer) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			buildSubset()
				.then(() => server?.hot.send({ type: "full-reload" }))
				.catch(console.error);
		}, 300);
	};

	return {
		name: "monolisa-subset",

		async buildStart() {
			await buildSubset();
		},

		configureServer(server: ViteDevServer) {
			rebuild(server);
			server.watcher.add(SRC_DIR);
			server.watcher.on("change", (file: string) => {
				if (/\.(svelte|yaml)$/.test(file)) rebuild(server);
			});
		},
	};
}
