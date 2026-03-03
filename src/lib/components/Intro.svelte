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
			{@const chars = profile.name_cn.split('')}
			{@const syllables = profile.name_pinyin?.split(' ') ?? []}
			<div class="flex items-end gap-[0.35em] font-wenkai">
				{#each chars as char, i}
					<div class="flex flex-col items-center w-[1em] text-3xl overflow-visible">
						{#if syllables[i]}
							<span class="text-xs text-muted-foreground leading-snug whitespace-nowrap">{syllables[i]}</span>
						{/if}
						<span class="font-light leading-none">{char}</span>
					</div>
				{/each}
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
