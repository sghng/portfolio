import { mkdir } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const FONT_FILES = [
	"0-normal.woff2",
	"1-italic.woff2",
	"2-normal.woff2",
	"3-italic.woff2",
	"4-normal.woff2",
	"5-italic.woff2",
	"6-normal.woff2",
	"7-italic.woff2",
	"8-normal.woff2",
	"9-italic.woff2",
];

const fontsDir = path.resolve(process.cwd(), "static", "fonts");

async function fileExists(filePath) {
	return Bun.file(filePath).exists();
}

const WRANGLER_BIN = process.env.WRANGLER_BIN?.trim() || "wrangler";

async function runProcess(command, args) {
	return new Promise((resolve, reject) => {
		const proc = spawn(command, args, {
			stdio: ["ignore", "pipe", "pipe"],
			env: process.env,
		});

		let stdout = "";
		let stderr = "";

		proc.stdout.on("data", (chunk) => {
			stdout += chunk.toString();
		});

		proc.stderr.on("data", (chunk) => {
			stderr += chunk.toString();
		});

		proc.on("error", (error) => {
			reject(error);
		});

		proc.on("close", (code) => {
			resolve({ code: code ?? 1, stdout, stderr });
		});
	});
}

async function runWrangler(args) {
	try {
		return await runProcess(WRANGLER_BIN, args);
	} catch (error) {
		if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
			return runProcess("bunx", ["wrangler", ...args]);
		}
		throw error;
	}
}

async function main() {
	const missingFonts = [];

	for (const fontFile of FONT_FILES) {
		const localPath = path.join(fontsDir, fontFile);
		if (!(await fileExists(localPath))) {
			missingFonts.push(fontFile);
		}
	}

	if (missingFonts.length === 0) {
		console.log("[sync:fonts] All font files already exist locally.");
		return;
	}

	const bucket = (process.env.R2_BUCKET || "bucket").trim();

	await mkdir(fontsDir, { recursive: true });

	for (const fontFile of missingFonts) {
		const localPath = path.join(fontsDir, fontFile);
		const key = `fonts/${fontFile}`;

		let downloaded = false;

		const result = await runWrangler([
			"r2",
			"object",
			"get",
			`${bucket}/${key}`,
			"--file",
			localPath,
		]);

		if (result.code === 0) {
			console.log(`[sync:fonts] Downloaded ${fontFile} from r2://${bucket}/${key}`);
			downloaded = true;
		}

		const combined = `${result.stdout}\n${result.stderr}`;
		if (!downloaded && !/NoSuchKey|Not Found|404|does not exist/i.test(combined)) {
			throw new Error(
				`wrangler failed for key '${key}': ${combined.trim() || "unknown error"}`,
			);
		}

		if (!downloaded) {
			throw new Error(`Unable to find ${fontFile} in bucket '${bucket}' at key '${key}'`);
		}
	}

	console.log(`[sync:fonts] Synced ${missingFonts.length} missing font file(s).`);
}

main().catch((error) => {
	console.error(`[sync:fonts] ${error instanceof Error ? error.message : String(error)}`);
	process.exit(1);
});
