<script>
	import { page } from '$app/stores';

	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO title="Privacy Policy | RGB Studios.org" url={$page.url.origin + '/privacy'} />

<article class="prose-custom mx-auto">
	<h1>Privacy Policy</h1>

	<img class="h-48 mx-auto" src="/img/pages/blog_post.svg" alt="" />

	<p>
		All of our applications are without ads. We will never sell your data to third parties or store
		sensitive data. We use local storage to save user preferences for settings in some of our apps.
		We use Google Analytics to get usage data and improve our products.
	</p>
	<p>
		For any questions, you can contact us at <a href="mailto:contact@rgbstudios.org">
			contact@rgbstudios.org
		</a>
	</p>
</article>
