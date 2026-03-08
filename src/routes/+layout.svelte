<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import "../app.css";

let { children } = $props();
</script>

<svelte:head>
	<script src="/gh-contribs.js"></script>
</svelte:head>

<ModeWatcher />

{@render children()}
