<script lang="ts">
import { page } from "$app/state";
</script>

<div class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="text-3xl font-bold">{page.status}</h1>
	<p class="mt-2">{page.error?.message}</p>
</div>
