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

	<div class="lg:grid lg:grid-cols-2 lg:gap-8">
		<form id="contact-form">
			<label for="subject">Subject</label>
			<select id="subject" name="subject" class="select select-bordered w-full block">
				<option value="An existing web app">An existing web app</option>
				<option value="A new web app">A new web app</option>
				<option value="A blog post">A blog post</option>
				<option value="A quote for my existing website">A quote for my existing website</option>
				<option value="A quote for a new website">A quote for a new website</option>
				<option value="A quote for style guide and brand identity"
					>A quote for style guide and brand identity</option
				>
			</select>

			<label for="from_email" class="mt-6 block">Email</label>
			<input
				required
				type="email"
				name="from_email"
				id="from_email"
				class="input input-bordered w-full"
			/>

			<label for="message" class="mt-6 block">Message</label>
			<textarea
				required
				id="message"
				name="message"
				class="textarea textarea-bordered block w-full"
				placeholder="Your message..."
			/>

			<input type="submit" id="contact-form-btn" value="Send Email" class="btn btn-primary mt-6" />
		</form>

		<script
			type="text/javascript"
			src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
		>
		</script>

		<script type="text/javascript">
			emailjs.init('eCcBFCDspEKglI10s');
		</script>

		<script>
			const btn = document.getElementById('contact-form-btn');

			document.getElementById('contact-form').addEventListener('submit', function (event) {
				event.preventDefault();

				btn.value = 'Sending...';

				const serviceID = 'default_service';
				const templateID = 'template_rrmeook';

				emailjs.sendForm(serviceID, templateID, this).then(
					() => {
						btn.value = 'Send Email';
						alert('Sent!');
						console.log('Form submitted successfully');
					},
					(err) => {
						btn.value = 'Send Email';
						alert('There was an error');
						console.error('Error submitting form: ' + JSON.stringify(err));
					}
				);
			});
		</script>

		<img class="hidden lg:block w-64 h-64 ml-auto" src="/img/pages/mailbox.svg" alt="" />
	</div>
</article>
