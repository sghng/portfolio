<script lang="ts">
import Github from "@lucide/svelte/icons/github";
import Linkedin from "@lucide/svelte/icons/linkedin";
import Twitter from "@lucide/svelte/icons/twitter";
import type { Component } from "svelte";
import type { Profile } from "$lib/types";

let { profile }: { profile: Profile } = $props();

const iconMap: Record<string, Component> = {
	github: Github,
	twitter: Twitter,
	linkedin: Linkedin,
};
</script>

<header class="space-y-4">
	<div class="flex justify-center items-end gap-6">
		<h1 class="font-heading text-3xl font-light tracking-tight italic" style="font-feature-settings: 'ss02' 1">{profile.name}</h1>
		{#if profile.name_cn}
			<div class="flex flex-col items-center leading-tight font-wenkai">
				{#if profile.name_pinyin}
					<span class="text-xs text-muted-foreground tracking-wide">{profile.name_pinyin}</span>
				{/if}
				<span class="text-3xl font-light">{profile.name_cn}</span>
			</div>
		{/if}
	</div>
	<p class="text-muted-foreground text-center">{profile.title}</p>
	<p class="text-sm leading-relaxed">{profile.bio}</p>

	<div class="flex justify-center gap-4">
		{#each profile.links as link}
			{@const Icon = iconMap[link.icon ?? ""]}
			{#if Icon}
				<a href={link.url} aria-label={link.label} class="text-muted-foreground hover:text-foreground transition-colors">
					<Icon size={20} />
				</a>
			{/if}
		{/each}
	</div>
</header>
