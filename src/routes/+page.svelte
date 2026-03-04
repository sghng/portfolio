<script lang="ts">
import { Github, Heart } from "@lucide/svelte";
import * as si from "simple-icons";
import Intro from "$lib/components/Intro.svelte";
import Section from "$lib/components/Section.svelte";

let { data } = $props();

/** Map a language name to a simple-icons SVG path */
function langIconPath(lang: string): string | undefined {
	const key = "si" + lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
	return (si as unknown as Record<string, { path: string }>)[key]?.path;
}

/** Extract the CRAN package name from a CRAN homepage URL */
function cranPkgName(url: string): string | undefined {
	const m = url.match(/cran\.r-project\.org\/web\/packages\/([^/]+)/);
	return m?.[1];
}
</script>

<svelte:head>
	<title>{data.profile.name}</title>
	<meta name="description" content="{data.profile.name} — {data.profile.title}" />
</svelte:head>

<main class="mx-auto max-w-3xl px-6 py-12 space-y-16">
	<!-- ── Profile / Hero ─────────────────────────────────────────────── -->
	<Intro profile={data.profile} />

	<!-- ── News ────────────────────────────────────────────────────────── -->
	{#if data.news.length > 0}
		<Section title="News">
			<ul class="space-y-2 text-sm">
				{#each data.news as item}
					<li>
						<span class="text-muted-foreground font-mono">{item.date}</span>
						<span class="ml-2">{item.message}</span>
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	<!-- ── Publications ────────────────────────────────────────────────── -->
	{#if data.publications.length > 0}
		<Section title="Publications">
			<ul class="space-y-4 text-sm">
				{#each data.publications as pub}
					<li>
						<span class="inline-block px-1.5 py-0.5 text-xs font-mono rounded bg-muted text-muted-foreground mr-2">
							{pub.type}
						</span>
						<strong>{pub.title}</strong>
						<br />
						<span class="text-muted-foreground">{pub.authors.join(", ")}</span>
						<br />
						{#if pub.journal}
							<span class="text-muted-foreground italic">{pub.journal}, {pub.year}</span>
						{:else}
							<span class="text-muted-foreground italic">{pub.year}</span>
						{/if}
						{#if pub.status}
							<span class="ml-2 text-xs text-muted-foreground">({pub.status})</span>
						{/if}
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	<!-- ── Presentations ───────────────────────────────────────────────── -->
	{#if data.presentations.length > 0}
		<Section title="Presentations & Talks">
			<ul class="space-y-3 text-sm">
				{#each data.presentations as pres}
					<li>
						<strong>{pres.title}</strong>
						<br />
						<span class="text-muted-foreground">{pres.event} &middot; {pres.date}</span>
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	<!-- ── Software ────────────────────────────────────────────────────── -->
	{#if data.software.length > 0}
		<Section title="Software">
			<ul class="space-y-3 text-sm">
				{#each data.software as pkg}
					{@const iconPath = langIconPath(pkg.language)}
					{@const cran = pkg.homepage ? cranPkgName(pkg.homepage) : undefined}
					<li>
						<strong class="font-mono">{pkg.name}</strong>
						{#if iconPath}
							<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-label={pkg.language} class="ml-1.5 inline-block align-text-bottom text-muted-foreground">
								<path d={iconPath} />
							</svg>
						{:else}
							<span class="ml-2 text-muted-foreground">({pkg.language})</span>
						{/if}
						{#if pkg.role && pkg.role.length > 0}
							<span class="ml-2 inline-block px-1.5 py-0.5 text-xs font-mono rounded bg-muted text-muted-foreground">{pkg.role.join(" | ")}</span>
						{/if}
						<br />
						{#if pkg.homepage}
							<a href={pkg.homepage} class="text-primary underline text-xs">Homepage</a>
						{/if}
						{#if pkg.source}
							<a href={pkg.source} class="ml-2 text-primary underline text-xs">Source</a>
						{/if}
						{#if cran}
							<a href={pkg.homepage} class="ml-2 inline-block align-text-bottom">
								<img src="https://cranlogs.r-pkg.org/badges/{cran}" alt="CRAN downloads for {cran}" class="inline h-4" />
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	<!-- ── Education ───────────────────────────────────────────────────── -->
	<Section title="Education">
		<ul class="space-y-6 text-sm">
			{#each data.education as edu}
				<li>
					<div class="flex items-baseline justify-between gap-4">
						<strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</strong>
						<span class="text-muted-foreground font-mono text-xs shrink-0">{edu.start} &ndash; {edu.end}</span>
					</div>
					<div class="text-muted-foreground">
						{#if edu.institution_url}
							<a href={edu.institution_url} class="underline underline-offset-4">{edu.institution}</a>
						{:else}
							{edu.institution}
						{/if}
						{#if edu.location}
							&middot; {edu.location}
						{/if}
					</div>
					{#if edu.gpa}
						<div class="text-muted-foreground">GPA: {edu.gpa}</div>
					{/if}
					{#if edu.highlights && edu.highlights.length > 0}
						<ul class="mt-1 list-disc list-inside text-muted-foreground">
							{#each edu.highlights as h}
								<li>{h}</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</Section>

	<!-- ── Teaching ────────────────────────────────────────────────────── -->
	{#if data.teaching.length > 0}
		<Section title="Teaching">
			<ul class="space-y-2 text-sm">
				{#each data.teaching as t}
					<li>
						<strong>{t.course}</strong>
						<span class="text-muted-foreground">&middot; {t.role} &middot; {t.term}</span>
						<br />
						<span class="text-muted-foreground">{t.institution}</span>
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	<!-- ── Experience ──────────────────────────────────────────────────── -->
	<Section title="Experience">
		<ul class="space-y-6 text-sm">
			{#each data.experience as exp}
				<li>
					<div class="flex items-baseline justify-between gap-4">
						<strong>{exp.title}</strong>
						<span class="text-muted-foreground font-mono text-xs shrink-0">
							{exp.start} &ndash; {exp.end ?? "Present"}
						</span>
					</div>
					<div class="text-muted-foreground">
						{#if exp.url}
							<a href={exp.url} class="underline underline-offset-4">{exp.organization}</a>
						{:else}
							{exp.organization}
						{/if}
						{#if exp.location}
							&middot; {exp.location}
						{/if}
					</div>
					{#if exp.description}
						<p class="mt-1 text-muted-foreground">{exp.description}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</Section>

	<!-- ── Service ─────────────────────────────────────────────────────── -->
	<Section title="Service & Organizations">
		<ul class="space-y-2 text-sm">
			{#each data.service as s}
				<li>
					<strong>{s.role}</strong>
					<span class="text-muted-foreground">&middot; {s.organization}</span>
					<br />
					<span class="text-muted-foreground text-xs">{s.institution}</span>
				</li>
			{/each}
		</ul>
	</Section>

	<!-- ── Footer ──────────────────────────────────────────────────────── -->
	<footer class="border-t pt-8 text-center text-xs text-muted-foreground space-y-1">
		<p>&copy; {new Date().getFullYear()} {data.profile.name}</p>
		<p>Built with <a href="https://svelte.dev/docs/kit" class="underline underline-offset-4 hover:text-foreground">SvelteKit</a>,{" "}<a href="https://ui.shadcn.com" class="underline underline-offset-4 hover:text-foreground">shadcn/ui</a>,{" "}and <Heart class="inline size-3 align-middle" /></p>
		<p class="flex items-center justify-center gap-1.5">
			Hosted on
			<a href="https://pages.cloudflare.com" aria-label="Cloudflare Pages" class="hover:text-foreground">
				<svg viewBox="0 0 24 24" fill="currentColor" class="size-4"><path d={si.siCloudflare.path} /></svg>
			</a>
			&middot; Source on
			<a href="https://github.com/sghng/portfolio" aria-label="GitHub" class="hover:text-foreground">
				<Github class="size-3.5" />
			</a>
		</p>
	</footer>
</main>
