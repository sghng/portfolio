<script lang="ts">
import * as icons from "@lucide/svelte";
import * as si from "simple-icons";
import type { Component } from "svelte";
import type { Profile } from "$lib/types";

let { profile }: { profile: Profile } = $props();

function toPascalCase(name: string): string {
	return name
		.split("-")
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join("");
}

function getLucideIcon(name: string): Component | undefined {
	return (icons as unknown as Record<string, Component>)[toPascalCase(name)];
}

function getSimpleIcon(name: string): string | undefined {
	const key = "si" + toPascalCase(name);
	return (si as unknown as Record<string, { path: string }>)[key]?.path;
}
</script>

<header class="space-y-4">
	<div class="flex justify-center items-end gap-4 sm:gap-6 px-4">
		<h1 class="font-heading text-2xl sm:text-3xl font-light tracking-tight italic text-right" style="font-feature-settings: 'ss02' 1">{profile.name}</h1>
		{#if profile.name_cn}
			{@const chars = profile.name_cn.split('')}
			{@const syllables = profile.name_pinyin?.split(' ') ?? []}
			<div class="flex items-end gap-[0.35em] font-wenkai shrink-0">
				{#each chars as char, i}
					<div class="flex flex-col items-center w-[1em] text-2xl sm:text-3xl overflow-visible">
						{#if syllables[i]}
							<span class="text-xs text-muted-foreground leading-snug whitespace-nowrap">{syllables[i]}</span>
						{/if}
						<span class="font-light leading-none">{char}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="text-muted-foreground text-center text-sm space-y-0.5">
		{#if profile.lab}
			<p>{profile.lab}</p>
		{/if}
		{#if profile.school}
			<p>{profile.school}</p>
		{/if}
	</div>
	<p class="text-muted-foreground text-center text-sm">{profile.title}</p>
	<p class="text-sm leading-relaxed">{profile.bio}</p>

	<div class="flex justify-center gap-4">
		{#each profile.links as link}
			{@const Icon = getLucideIcon(link.icon)}
			{@const siPath = !Icon ? getSimpleIcon(link.icon) : undefined}
			{#if Icon}
				<a href={link.url} aria-label={link.icon} class="text-muted-foreground hover:text-foreground transition-colors">
					<Icon size={20} />
				</a>
			{:else if siPath}
				<a href={link.url} aria-label={link.icon} class="text-muted-foreground hover:text-foreground transition-colors">
					<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
						<path d={siPath} />
					</svg>
				</a>
			{/if}
		{/each}
	</div>
</header>
