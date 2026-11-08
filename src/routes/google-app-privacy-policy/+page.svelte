<script lang="ts">
import LegalPage from "#lib/components/LegalPage.svelte";

const sections = [
	{
		title: "Who this policy covers",
		body: [
			"This Privacy Policy describes how sghng (\"the Application\"), a personal OAuth client operated by the developer of sgh.ng, handles Google user data. The Application is used by exactly one person: its developer. If you are not the developer himself, do not install this app.",
			"Because the Application is personal, there is little to say. The sections below still make the standard disclosures Google asks of any OAuth client.",
		],
	},
	{
		title: "What Google user data is accessed",
		body: [
			"sghng accesses only the Google user data made available by the scopes the developer granted at sign-in. That is limited to basic profile information (name, email address, profile picture) and, where a particular scope requires it, the content of the Google services that scope names.",
			"No other Google data is requested, imported, or inferred.",
		],
	},
	{
		title: "How Google user data is used",
		body: [
			"Accessed data is used solely to operate the Application for its developer — for example, to identify the signed-in account, to authenticate API requests, and to display information back to the developer.",
			"It is not used for advertising, profiling, credit assessment, or any purpose unrelated to the Application's own operation. It is never sold, rented, or otherwise made available to data brokers, information resellers, or advertisers.",
		],
	},
	{
		title: "With whom data is shared",
		body: [
			"Google user data is not shared, transferred, or disclosed to third parties, other than as required to operate the Application's own infrastructure, or as required by law.",
			"The Application is not used to develop, improve, or train generalized or non-personalized machine learning or artificial intelligence models.",
		],
	},
	{
		title: "Where data is stored and how it is protected",
		body: [
			"Any data the Application stores is held on the developer's own infrastructure. OAuth refresh tokens and credentials are kept server-side and are never exposed to a browser or to any other party. Access is restricted to the developer.",
			"Traffic to and from the Application uses HTTPS. No third-party analytics, trackers, or advertising scripts are present on this site.",
		],
	},
	{
		title: "Retention and deletion",
		body: [
			"Google user data is retained only for as long as it is needed to operate the Application. When it is no longer needed, or when the developer revokes the Application's access, the associated tokens and any cached data are deleted.",
			"Because the only user is the developer, deletion requests are moot — but access can be revoked at any time from the Google Account permissions page at https://myaccount.google.com/permissions, which immediately ends the Application's access to Google data.",
		],
	},
	{
		title: "Changes to this policy",
		body: [
			"This policy may change at any time, without notice, since there are no other users to notify. The current version is always the one served at this URL.",
		],
	},
	{
		title: "Contact",
		body: [
			"Questions about this policy can be raised by opening an issue on the portfolio site's source repository, https://github.com/sghng/portfolio.",
		],
	},
];
</script>

<LegalPage title="Privacy Policy" subtitle="For the sghng Google OAuth application">
	<p>
		<strong>This app is just for the developer himself.</strong> If you are not the developer himself, do not install
		this app. And if you install it anyway, no data privacy whatsoever is guaranteed.
	</p>

	{#each sections as section}
		<section class="space-y-2 pt-2">
			<h2 class="font-heading text-base font-medium">{section.title}</h2>
			{#each section.body as paragraph}
				<p>{paragraph}</p>
			{/each}
		</section>
	{/each}
</LegalPage>
