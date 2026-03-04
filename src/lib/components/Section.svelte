<script lang="ts">
import type { Snippet } from "svelte";

let { title, children }: { title: string; children: Snippet } = $props();
</script>

<section>
	<h2 class="font-heading text-xl font-semibold mb-4 text-center">{title}</h2>
	{@render children()}
</section>
