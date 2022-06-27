<script>
	import Icon from './Icon.svelte';

	export let title, link;

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

<p>Share it:</p>
<a
	href="https://www.facebook.com/sharer.php?t={encodeURIComponent(title)}&u={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	title="Facebook"
>
	<Icon name="facebook" class="w-6 h-6" />
	&nbsp; Facebook
</a>

<a
	href="https://twitter.com/intent/tweet?text={encodeURIComponent(title)}&url={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	title="Twitter"
>
	<Icon name="twitter" class="w-6 h-6" />
	&nbsp; Twitter
</a>

<a
	href="https://www.pinterest.com/pin/create/button/?description={encodeURIComponent(
		title
	)}&media=&url={encodeURIComponent(link)}"
	target="_blank"
	class="btn btn-outline"
	title="Pinterest"
>
	<Icon name="pinterest" class="w-6 h-6" />
	&nbsp; Pinterest
</a>

<a
	href="https://www.reddit.com/submit?title={encodeURIComponent(title)}&url={encodeURIComponent(
		link
	)}"
	target="_blank"
	class="btn btn-outline"
	title="Reddit"
>
	<Icon name="reddit" class="w-6 h-6" />
	&nbsp; Reddit
</a>

<!-- `%0D%0A` is `<br>` encoded -->
<a
	href="mailto:?to=&body={encodeURIComponent(
		'I thought you would enjoy ' + title + ':'
	)}%0D%0A{encodeURIComponent(link)} &subject={encodeURIComponent(title)}"
	target="_blank"
	class="btn btn-outline"
	title="Email"
>
	<Icon name="envelope" class="w-6 h-6" />
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
	title="Copy Link"
>
	<Icon name="copy" class="w-6 h-6" />
	&nbsp;
	{copied ? 'Copied' : 'Copy Link'}</button
>

<button on:click={() => shareApp(title, '', link)} class="btn btn-outline" title="Share">
	<Icon name="share" class="w-6 h-6" />
	&nbsp; Share</button
>

<!-- 
    <a class="wplogout-social-sharing wplogout-social-facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $wplogoutURL; ?>" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
	<a class="wplogout-social-sharing wplogout-social-twitter" href="https://twitter.com/intent/tweet?text=<?php echo $wplogoutTitle;?>&url=<?php echo $wplogoutURL;?>&via=wplogout" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
	<a class="wplogout-social-sharing wplogout-social-pinterest" href="https://pinterest.com/pin/create/button/?url=<?php echo $wplogoutURL; ?>&media=<?php echo $wplogoutImage;   ?>&description=<?php echo $wplogoutTitle; ?>" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill-rule="evenodd" clip-rule="evenodd"/></svg></a>
	<a class="wplogout-social-sharing wplogout-social-linkedin" href="https://www.linkedin.com/shareArticle?url=<?php echo $wplogoutURL; ?>&title=<?php echo $wplogoutTitle; ?>&mini=true" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg></a>
	<a class="wplogout-social-sharing wplogout-social-whatsapp" href="https://api.whatsapp.com/send?text=<?php echo $wplogoutTitle; echo " "; echo $wplogoutURL;?>" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg></a>
	<a class="wplogout-social-sharing wplogout-social-reddit" href="https://reddit.com/submit?url=<?php echo $wplogoutURL;?>&title=<?php echo $wplogoutTitle; ?>" target="_blank" rel="nofollow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/></svg></a>

 -->
