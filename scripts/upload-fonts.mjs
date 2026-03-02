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
const bucket = (process.env.R2_BUCKET || "bucket").trim();
const WRANGLER_BIN = process.env.WRANGLER_BIN?.trim() || "wrangler";

async function runWrangler(args) {
	return new Promise((resolve, reject) => {
		const proc = spawn(WRANGLER_BIN, args, {
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

async function main() {
	for (const fontFile of FONT_FILES) {
		const localPath = path.join(fontsDir, fontFile);
		if (!(await Bun.file(localPath).exists())) {
			throw new Error(`Missing local font file: ${localPath}`);
		}

		const key = `fonts/${fontFile}`;
		const result = await runWrangler([
			"r2",
			"object",
			"put",
			`${bucket}/${key}`,
			"--file",
			localPath,
		]);

		if (result.code !== 0) {
			throw new Error(
				`wrangler failed for '${fontFile}': ${(result.stderr || result.stdout).trim() || "unknown error"}`,
			);
		}

		console.log(`[upload:fonts] Uploaded ${fontFile} to r2://${bucket}/${key}`);
	}

	console.log(`[upload:fonts] Uploaded ${FONT_FILES.length} font file(s).`);
}

main().catch((error) => {
	console.error(`[upload:fonts] ${error instanceof Error ? error.message : String(error)}`);
	process.exit(1);
});
