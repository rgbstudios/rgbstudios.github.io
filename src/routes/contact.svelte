<script>
	import Breadcrumbs from '../components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>Contact | RGB Studios.org</title>
</svelte:head>

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

<article class="prose lg:prose-xl mx-auto">
	<h1>Let's Get in Touch</h1>
	<p>
		Reach out about any of our web apps, posts, media, interviews, or inquiries about creating
		branding or designing a website.
	</p>
	<!-- https://stackoverflow.com/a/12627093/4907950 -->
	<form action="mailto:contact@rgbstudios.org" method="GET">
		<label for="subject">Subject</label>
		<select id="subject" name="subject" class="select select-bordered w-full max-w-xs block">
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
</article>
