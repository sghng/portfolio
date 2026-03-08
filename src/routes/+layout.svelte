<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import "../app.css";

let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="https://excalidraw.com/Virgil.woff2" rel="preload" as="font" type="font/woff2" crossorigin="anonymous">
	<script src="/gh-contribs.js"></script>
</svelte:head>

<ModeWatcher />

{@render children()}
