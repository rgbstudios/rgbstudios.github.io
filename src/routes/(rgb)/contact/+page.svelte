<script>
	import { page } from '$app/stores';

	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<svelte:head>
	<title>Contact | RGB Studios.org</title>
</svelte:head>

<SEO
	title="Contact | RGB Studios - A Web Development Company"
	url={$page.url.origin + '/contact'}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Contact'
		}
	]}
/>

<article class="prose-custom mx-auto my-8">
	<h1 class="text-center">Let's Get in Touch</h1>
	<p>
		Reach out about any of our web apps, posts, media, interviews, or inquiries about creating
		branding or designing a website.
	</p>

	<img class="w-full max-w-xl mx-auto" src="/img/pages/mobile_wireframe.svg" alt="" />

	<!-- https://stackoverflow.com/a/12627093/4907950 -->
	<div class="lg:grid lg:grid-cols-2 lg:gap-8">
		<form action="mailto:contact@rgbstudios.org" method="GET">
			<label for="subject">Subject</label>
			<select id="subject" name="subject" class="select select-bordered w-full block">
				<option>An existing web app</option>
				<option>A new web app</option>
				<option>A blog post</option>
				<option>A quote for my existing website</option>
				<option>A quote for a new website</option>
				<option>A quote for style guide and brand identity</option>
			</select>
			<label for="body" class="mt-6 block">Message</label>
			<textarea
				id="body"
				name="body"
				class="textarea textarea-bordered block w-full"
				placeholder="Your message..."
			/>
			<input type="submit" value="Send" class="btn btn-primary mt-6" />
		</form>
		<img class="hidden lg:block w-64 h-64 ml-auto" src="/img/pages/mailbox.svg" alt="" />
	</div>
</article>
