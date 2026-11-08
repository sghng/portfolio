<script lang="ts">
import { ExternalLink } from "@lucide/svelte";

let {
	title,
	pageTitle = `${title} — sghng`,
	subtitle,
	children,
} = $props<{
	title: string;
	pageTitle?: string;
	subtitle: string;
	children: import("svelte").Snippet;
}>();
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
	<meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<main class="mx-auto max-w-3xl px-6 py-12 space-y-8">
	<header class="space-y-2">
		<h1 class="font-heading text-2xl font-medium">{title}</h1>
		<p class="text-sm text-muted-foreground">{subtitle}</p>
	</header>

	<div class="space-y-4 text-sm">
		{@render children()}
	</div>

	<footer class="border-t pt-6 text-xs text-muted-foreground">
		<p>
			Back to <a href="/" class="underline underline-offset-4 hover:text-foreground">sgh.ng</a>
			<ExternalLink class="inline size-3 align-text-bottom" />
		</p>
	</footer>
</main>
