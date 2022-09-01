<script>
	// https://github.com/bradvin/social-share-urls/blob/master/code/javascript/javascript/social-share-media.js

	import Icon from './Icon.svelte';

	export let title, link, isDark;

	// copyText and shareText copied from Desktop Clock

	// Copies a string to clipboard
	// Uses navigator API if available, else uses execCommand (deprecated)
	// Returns a boolean if copy was successful
	// See: https://stackoverflow.com/q/400212/4907950
	async function copyText(str) {
		console.log('Copying', str);
		if (!navigator.clipboard) {
			// fallback
			let input = document.createElement('textarea');
			input.innerHTML = str;
			document.body.appendChild(input);
			input.focus();
			input.select();
			let result;

			try {
				result = document.execCommand('copy');
				console.log(
					'Fallback: Copying text command was ' + (result ? 'successful' : 'unsuccessful')
				);
			} catch (err) {
				console.error('Fallback: Could not copy text: ', err);
			}
			document.body.removeChild(input);
			return result;
		}
		const result = navigator.clipboard.writeText(str).then(
			function () {
				console.log('Async: Copying to clipboard was successful');
				return true;
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
				return false;
			}
		);
		return result;
	}

	export function shareApp(shareTitle, shareText, shareLink) {
		navigator.share &&
			navigator
				.share({
					title: shareTitle,
					text: shareText,
					url: shareLink
				})
				.then(() => console.log('Successful share'))
				.catch((err) => console.log('Error sharing', err));
	}

	$: copied = false;
</script>

<a
	href="https://www.facebook.com/sharer.php?t={encodeURIComponent(title)}&u={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Facebook"
>
	<Icon name="facebook" />
	&nbsp; Share
</a>

<a
	href="https://twitter.com/intent/tweet?text={encodeURIComponent(title)}&url={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Twitter"
>
	<Icon name="twitter" />
	&nbsp; Tweet
</a>

<a
	href="https://www.pinterest.com/pin/create/button/?url={encodeURIComponent(link)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Pinterest"
>
	<Icon name="pinterest" />
	&nbsp; Pin
</a>

<!-- https://theonetechnologies.com/blog/post/how-to-get-facebook-application-id-and-secret-key -->
<a
	href="https://www.facebook.com/dialog/send?link={encodeURIComponent(
		link
	)}&app_id=1132946187618983&redirect_uri=https%3A%2F%2Frgbstudios.org"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Facebook Messenger"
>
	<Icon name="facebook_messenger" />
	&nbsp; Share
</a>

<a
	href="https://www.reddit.com/submit?title={encodeURIComponent(title)}&url={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Reddit"
>
	<Icon name="reddit" />
	&nbsp; Post
</a>

<a
	href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(link)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Linkedin"
>
	<Icon name="linkedin" />
	&nbsp; Post
</a>

<a
	href="https://api.whatsapp.com/send?text={encodeURIComponent(title + ': ' + link)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Whatsapp"
>
	<Icon name="whatsapp" />
	&nbsp; Share
</a>

<!-- `%0D%0A` is `<br>` encoded -->
<a
	href="mailto:?to=&body={encodeURIComponent(
		'I thought you would enjoy ' + title + ':'
	)}%0D%0A{encodeURIComponent(link)} &subject={encodeURIComponent(title)}"
	target="_blank"
	class="btn btn-outline"
	class:light={!isDark}
	title="Email"
>
	<Icon name="envelope" />
	&nbsp; Email
</a>

<button
	on:click={() => {
		copyText(link).then((success) => {
			if (success) {
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2500);
			}
		});
	}}
	class="btn btn-outline"
	class:light={!isDark}
	title="Copy Link"
>
	<Icon name="copy" />
	&nbsp;
	{copied ? 'Copied' : 'Copy Link'}
</button>

<button
	class:light={!isDark}
	on:click={() => shareApp(title, '', link)}
	class="btn btn-outline btn-light"
	title="Share"
>
	<Icon name="share" />
	&nbsp; Share
</button>

<button class:light={!isDark} on:click={() => window.print()} class="btn btn-outline" title="Share">
	<Icon name="print" />
	&nbsp; Print
</button>

<style>
	a,
	button {
		@apply m-2 ml-0;
	}

	.light {
		@apply border-black text-black;
	}
</style>
