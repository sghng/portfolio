// Build-time script to fetch GitHub contributions
// Run this before building: node scripts/fetch-gh-contribs.js

const username = process.argv[2] || "sghng";

async function fetchContributions() {
	try {
		const response = await fetch(
			`https://github.com/users/${username}/contributions`,
		);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const html = await response.text();
		const contribs = parseContributions(html);

		if (contribs.length === 0) {
			console.warn("No contributions found, keeping existing file");
			return;
		}

		await Bun.write(
			"static/gh-contribs.json",
			JSON.stringify(contribs, null, 2),
		);
		console.log(`✓ Fetched ${contribs.length} weeks of contributions for ${username}`);
	} catch (error) {
		console.error("Failed to fetch contributions:", error.message);
		process.exit(1);
	}
}

function parseContributions(html) {
	// Extract data from table cells - order of attributes varies
	// Match td elements containing both data-ix and data-level
	const cellRegex = /<td[^\u003e]*data-ix="(\d+)"[^\u003e]*data-level="(\d)"[^\u003e]*>/g;
	const cellRegexAlt = /<td[^\u003e]*data-level="(\d)"[^\u003e]*data-ix="(\d+)"[^\u003e]*>/g;
	const weekMap = new Map();

	let match;
	// Try first pattern (data-ix before data-level)
	while ((match = cellRegex.exec(html)) !== null) {
		const weekIndex = parseInt(match[1], 10);
		const level = parseInt(match[2], 10);

		if (!weekMap.has(weekIndex)) {
			weekMap.set(weekIndex, []);
		}
		weekMap.get(weekIndex).push(level);
	}

	// If no matches, try alternative pattern (data-level before data-ix)
	if (weekMap.size === 0) {
		while ((match = cellRegexAlt.exec(html)) !== null) {
			const level = parseInt(match[1], 10);
			const weekIndex = parseInt(match[2], 10);

			if (!weekMap.has(weekIndex)) {
				weekMap.set(weekIndex, []);
			}
			weekMap.get(weekIndex).push(level);
		}
	}

	// Convert to sorted array
	return Array.from(weekMap.entries())
		.sort((a, b) => a[0] - b[0])
		.map(([, levels]) => levels);
}

fetchContributions();
