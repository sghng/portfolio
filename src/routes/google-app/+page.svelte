<script lang="ts">
import LegalPage from "#lib/components/LegalPage.svelte";

const links = [
	{ href: "/google-app-privacy-policy", label: "Privacy Policy" },
	{ href: "/google-app-terms-of-service", label: "Terms of Service" },
];
</script>

<LegalPage
	title="sghng"
	pageTitle="sghng"
	subtitle="Personal OAuth application"
>
	<p>
		<strong>sghng</strong> is a personal application, maintained and used by a single developer, reached via Google
		OAuth sign-in.
	</p>
	<p>
		It is not a public product, is not distributed to users, and is not offered to anyone other than its developer.
		The pages below describe, for Google's OAuth review process, what the application does with Google user data and
		on what terms it is offered.
	</p>

	<ul class="space-y-2">
		{#each links as link}
			<li>
				<a href={link.href} class="underline underline-offset-4 hover:text-muted-foreground">{link.label}</a>
			</li>
		{/each}
	</ul>
</LegalPage>
