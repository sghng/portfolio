import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";
import subsetFont from "subset-font";
import type { Plugin, ViteDevServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PROFILE_YAML = resolve(__dirname, "src/lib/data/profile.yaml");
const CACHE_DIR = resolve(__dirname, "node_modules/.cache/wenkai-subset");
const OUTPUT_DIR = resolve(__dirname, "static/fonts");
const OUTPUT_FILE = resolve(OUTPUT_DIR, "LXGWWenKai-subset.woff2");

const GITHUB_LATEST_API =
	"https://api.github.com/repos/lxgw/LxgwWenKai/releases/latest";
const FONT_ASSET_NAME = "LXGWWenKai-Light.ttf";

interface Profile {
	name_cn?: string;
	name_pinyin?: string;
}

interface GithubAsset {
	name: string;
	browser_download_url: string;
}

interface GithubRelease {
	tag_name: string;
	assets: GithubAsset[];
}

/** Fetch with retries — CI builders share egress IPs that can hit transient 5xx/429s */
async function fetchWithRetry(
	url: string,
	init?: RequestInit,
	retries = 3,
): Promise<Response> {
	for (let attempt = 1; ; attempt++) {
		const res = await fetch(url, init);
		if (res.ok || attempt === retries) return res;
		if (res.status < 500 && res.status !== 429) return res;
		console.warn(
			`[wenkai-subset] fetch got ${res.status}, retrying (${attempt}/${retries - 1})…`,
		);
		await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
	}
}

function getCharacters(): string {
	const profile = loadYaml(readFileSync(PROFILE_YAML, "utf8")) as Profile;
	const parts: string[] = [];
	if (profile.name_cn) parts.push(profile.name_cn);
	if (profile.name_pinyin) parts.push(profile.name_pinyin);
	return [...new Set(parts.join(""))].join("");
}

async function fetchLatestTtf(): Promise<Buffer> {
	// Fetch latest release metadata
	const metaRes = await fetchWithRetry(GITHUB_LATEST_API, {
		headers: { Accept: "application/vnd.github+json" },
	});
	if (!metaRes.ok) {
		throw new Error(
			`GitHub API error ${metaRes.status}: ${await metaRes.text()}`,
		);
	}
	const release = (await metaRes.json()) as GithubRelease;
	const tag = release.tag_name;

	// Return cached TTF if already downloaded for this tag
	const cachedPath = resolve(CACHE_DIR, `${tag}-${FONT_ASSET_NAME}`);
	if (existsSync(cachedPath)) {
		console.log(`[wenkai-subset] using cached font for ${tag}`);
		return readFileSync(cachedPath);
	}

	// Find the download URL for the Light TTF
	const asset = release.assets.find((a) => a.name === FONT_ASSET_NAME);
	if (!asset) {
		throw new Error(`Asset "${FONT_ASSET_NAME}" not found in release ${tag}`);
	}

	console.log(`[wenkai-subset] downloading ${FONT_ASSET_NAME} (${tag})…`);
	const fontRes = await fetchWithRetry(asset.browser_download_url);
	if (!fontRes.ok) {
		throw new Error(`Font download error ${fontRes.status}`);
	}
	const ttf = Buffer.from(await fontRes.arrayBuffer());

	mkdirSync(CACHE_DIR, { recursive: true });
	writeFileSync(cachedPath, ttf);
	console.log(`[wenkai-subset] cached to ${cachedPath}`);

	return ttf;
}

async function buildSubset(): Promise<void> {
	const chars = getCharacters();
	if (!chars) return;

	const sourceTtf = await fetchLatestTtf();
	const woff2 = await subsetFont(sourceTtf, chars, { targetFormat: "woff2" });

	mkdirSync(OUTPUT_DIR, { recursive: true });
	writeFileSync(OUTPUT_FILE, woff2);

	const kb = (woff2.byteLength / 1024).toFixed(1);
	console.log(`[wenkai-subset] ${chars.length} chars → ${kb} kB`);
}

export function wenkaiSubset(): Plugin {
	return {
		name: "wenkai-subset",

		async buildStart() {
			await buildSubset();
		},

		configureServer(server: ViteDevServer) {
			buildSubset().catch(console.error);

			server.watcher.add(PROFILE_YAML);
			server.watcher.on("change", async (file: string) => {
				if (file === PROFILE_YAML) {
					await buildSubset().catch(console.error);
					server.hot.send({ type: "full-reload" });
				}
			});
		},
	};
}
