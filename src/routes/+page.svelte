<script lang="ts">
import Intro from "$lib/components/Intro.svelte";

let { data } = $props();
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
		<section>
			<h2 class="font-heading text-xl font-semibold mb-4">News</h2>
			<ul class="space-y-2 text-sm">
				{#each data.news as item}
					<li>
						<span class="text-muted-foreground font-mono">{item.date}</span>
						<span class="ml-2">{item.message}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- ── Publications ────────────────────────────────────────────────── -->
	{#if data.publications.length > 0}
		<section>
			<h2 class="font-heading text-xl font-semibold mb-4">Publications</h2>
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
		</section>
	{/if}

	<!-- ── Presentations ───────────────────────────────────────────────── -->
	{#if data.presentations.length > 0}
		<section>
			<h2 class="font-heading text-xl font-semibold mb-4">Presentations & Talks</h2>
			<ul class="space-y-3 text-sm">
				{#each data.presentations as pres}
					<li>
						<strong>{pres.title}</strong>
						<br />
						<span class="text-muted-foreground">{pres.event} &middot; {pres.date}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- ── Software ────────────────────────────────────────────────────── -->
	{#if data.software.length > 0}
		<section>
			<h2 class="font-heading text-xl font-semibold mb-4">Software</h2>
			<ul class="space-y-3 text-sm">
				{#each data.software as pkg}
					<li>
						<strong class="font-mono">{pkg.name}</strong>
						<span class="ml-2 text-muted-foreground">({pkg.language})</span>
						{#if pkg.role}
							<span class="ml-1 text-xs text-muted-foreground">&mdash; {pkg.role}</span>
						{/if}
						<br />
						{#if pkg.homepage}
							<a href={pkg.homepage} class="text-primary underline text-xs">Homepage</a>
						{/if}
						{#if pkg.source}
							<a href={pkg.source} class="ml-2 text-primary underline text-xs">Source</a>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- ── Education ───────────────────────────────────────────────────── -->
	<section>
		<h2 class="font-heading text-xl font-semibold mb-4">Education</h2>
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
	</section>

	<!-- ── Teaching ────────────────────────────────────────────────────── -->
	{#if data.teaching.length > 0}
		<section>
			<h2 class="font-heading text-xl font-semibold mb-4">Teaching</h2>
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
		</section>
	{/if}

	<!-- ── Experience ──────────────────────────────────────────────────── -->
	<section>
		<h2 class="font-heading text-xl font-semibold mb-4">Experience</h2>
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
	</section>

	<!-- ── Service ─────────────────────────────────────────────────────── -->
	<section>
		<h2 class="font-heading text-xl font-semibold mb-4">Service & Organizations</h2>
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
	</section>

	<!-- ── Footer ──────────────────────────────────────────────────────── -->
	<footer class="border-t pt-8 text-center text-xs text-muted-foreground">
		<p>&copy; {new Date().getFullYear()} {data.profile.name} &middot; Built with SvelteKit</p>
	</footer>
</main>
