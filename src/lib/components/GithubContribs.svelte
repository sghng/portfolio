<svelte:options runes={true} />

<script lang="ts">
import { onMount } from "svelte";

let { username }: { username: string } = $props();
let container: HTMLDivElement;
let scrollContainer: HTMLDivElement;
let isVisible = $state(false);

onMount(() => {
	// Set up intersection observer to trigger animation when scrolled into view
	if (container) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.3 },
		);
		observer.observe(container);

		return () => observer.disconnect();
	}
});

// Scroll to rightmost when gh-contribs element is connected
$effect(() => {
	const checkAndScroll = () => {
		const ghContribs = container?.querySelector("gh-contribs");
		if (ghContribs && scrollContainer) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
		}
	};

	// Check immediately and after a short delay for custom element to render
	checkAndScroll();
	setTimeout(checkAndScroll, 100);
});
</script>

<div class="gh-contribs-container" bind:this={container}>
	<!-- Annotation above the heatmap, outside scroll area -->
	<div class="iykyk-annotation" class:visible={isVisible}>
		<span class="iykyk-text">IYKYK</span>
		<svg viewBox="0 0 60 40" class="arrow-svg" aria-hidden="true">
			<path
				d="M 30 5 Q 35 15, 30 25 T 30 35"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				class="arrow-path"
			/>
			<path
				d="M 25 30 L 30 35 L 35 30"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="arrow-head"
			/>
		</svg>
	</div>

	<div class="gh-contribs-wrapper" bind:this={scrollContainer}>
		<gh-contribs data-username={username}></gh-contribs>
	</div>
</div>

<style>
	.gh-contribs-container {
		position: relative;
		margin: 2rem 0;
	}

	.iykyk-annotation {
		position: absolute;
		top: -3.5rem;
		left: 85%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 2;
		pointer-events: none;
	}

	.iykyk-text {
		font-family: 'Excalifont', cursive;
		font-size: 1.25rem;
		font-weight: 400;
		color: var(--muted-foreground);
		transform: rotate(-2deg);
		opacity: 0;
	}

	.arrow-svg {
		width: 40px;
		height: 30px;
		color: var(--muted-foreground);
		margin-top: -5px;
	}

	.arrow-path {
		stroke-dasharray: 50;
		stroke-dashoffset: 50;
	}

	.arrow-head {
		stroke-dasharray: 20;
		stroke-dashoffset: 20;
	}

	/* Animation triggered when visible */
	.iykyk-annotation.visible .iykyk-text {
		animation: fadeInText 0.5s ease-out 0.5s forwards;
	}

	.iykyk-annotation.visible .arrow-path {
		animation: drawArrow 0.8s ease-out 1s forwards;
	}

	.iykyk-annotation.visible .arrow-head {
		animation: drawArrow 0.4s ease-out 1.5s forwards;
	}

	@keyframes drawArrow {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fadeInText {
		to {
			opacity: 0.8;
		}
	}

	.gh-contribs-wrapper {
		position: relative;
		width: 100%;
		height: 120px;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.gh-contribs-wrapper::-webkit-scrollbar {
		display: none;
	}

	/* Gradient overlays using mask-image for smooth fade effect */
	.gh-contribs-wrapper {
		--fade-width: 60px;
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black var(--fade-width),
			black calc(100% - var(--fade-width)),
			transparent 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black var(--fade-width),
			black calc(100% - var(--fade-width)),
			transparent 100%
		);
	}

	:global(gh-contribs) {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(7, 1fr);
		gap: 3px;
		justify-content: start;
		padding: 0 10%;
		height: 100%;
		min-width: max-content;
	}

	:global(gh-contribs div) {
		position: relative;
		width: 10px;
		height: 10px;
		border-radius: 2px;
		background: var(--muted);
		transition: transform 0.2s ease;
		flex-shrink: 0;
	}

	:global(gh-contribs div:hover) {
		transform: scale(1.3);
	}

	:global(gh-contribs div[data-level="0"]) {
		opacity: 0.3;
	}

	:global(gh-contribs div[data-level="1"]) {
		background: color-mix(in oklch, var(--primary) 30%, transparent);
	}

	:global(gh-contribs div[data-level="2"]) {
		background: color-mix(in oklch, var(--primary) 60%, transparent);
	}

	:global(gh-contribs div[data-level="3"]) {
		background: var(--primary);
	}

	:global(gh-contribs div[data-level="4"]) {
		background: var(--primary);
		box-shadow: 0 0 6px color-mix(in oklch, var(--primary) 50%, transparent);
	}
</style>
