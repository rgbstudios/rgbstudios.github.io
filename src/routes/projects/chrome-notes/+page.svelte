<script>
	import Carousel from '$lib/components/base/Carousel.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import { shareApp } from '$lib/components/ShareButtons.svelte';

	const slides = [
		'chrome-notes-store-0.png',
		'chrome-notes-store-1.png',
		'chrome-notes-store-2.png',
		'chrome-notes-store-3.png'
	];

	const urls = {
		chrome:
			'https://chrome.google.com/webstore/detail/chrome-notes/lnfempckkegmaeleniojhjplemmebgfi',
		edge: 'https://microsoftedge.microsoft.com/addons/detail/edge-notes/fiigjfolhmeakepmplcmljcnonjggine',
		firefox: 'https://addons.mozilla.org/en-GB/firefox/addon/ff-notes/'
	};
</script>

<ProjectHeader
	title="Chrome Notes"
	slug="chrome-notes"
	description="A simple notepad extension for Google Chrome"
	keywords={[
		'chrome notes',
		'browser notepad',
		'notepad extension',
		'note extension',
		'notes extension',
		'notes extension for chrome',
		'notes extension multiple notes',
		'notes extension with focus mode',
		'speak text outloud',
		'quickly take notes in browser',
		'edge notes extension',
		'firefox notes extension',
		'best notepad extensions',
		'browser extension notepad',
		'best chrome extensions'
	]}
	icon="img/projects/icons/chrome-notes.png"
	screenshot="img/projects/screenshots/chrome-notes.png"
/>

<!-- f90
f36 fc9 -->

<div class="grid gap-4 lg:grid-cols-2 items-center bg-[#f36] p-10 mb-10">
	<div>
		<h2 class="text-2xl my-4">A simple notepad extension for Google Chrome</h2>
		<p class="text-lg mb-10">
			Easily copy around words in your browser, jot down notes for later, download, share, speak out
			loud and more. Chrome notes has quick buttons for common functions like cut, copy, and paste
			as well as night mode, focus mode, and more.
		</p>
	</div>

	<div>
		<Carousel
			let:item={slide}
			items={slides.map((src, i) => ({ id: i, src }))}
			buttonStyle="secondary"
		>
			<img
				src={'/img/projects/screenshots/' + slide.src}
				alt="chrome notes screenshot"
				class="mb-12"
			/>
		</Carousel>
	</div>
</div>

<div class="flex flex-col md:flex-row justify-between gap-4">
	<a
		href={urls.chrome}
		target="_blank"
		rel="noreferrer"
		class="btn btn-lg btn-primary no-underline"
	>
		Install Chrome Notes &nbsp; <Icon name="bag" />
	</a>

	<button
		class="btn btn-lg btn-primary no-underline"
		on:click={() =>
			shareApp(
				'Chrome Notes',
				'Check out Chrome Notes, a simple notepad extension for Google Chrome',
				urls.chrome
			)}
	>
		Share Chrome Notes &nbsp; <Icon name="share" />
	</button>
</div>

<hr class="my-10" />

<div class="grid md:grid-cols-2 my-10 md:my-0">
	<ul class="p-4 list-disc list-inside text-xl leading-relaxed my-auto">
		<li>Shortcut keys for cut, copy, paste, select all, delete, undo, redo</li>
		<li>Common keyboard shortcuts like ctrl+X, ctrl+C, ctrl+V work</li>
		<li>Download as text file</li>
		<li>Read note (or selection) out loud</li>
		<li>Spellcheck</li>
	</ul>
	<img src="/img/projects/screenshots/chrome-notes.png" alt="chrome notes screenshot" />
</div>

<div class="grid md:grid-cols-2 my-10 md:my-0">
	<img
		class="order-1 md:order-0"
		src="/img/projects/screenshots/chrome-notes-menu.png"
		alt="chrome notes screenshot"
	/>
	<ul class="order-0 md:order-1 p-4 list-disc list-inside text-xl leading-relaxed my-auto">
		<li>Store multiple notes</li>
		<li>Custom font size</li>
		<li>Resize your notepad</li>
		<li>Share your notes with friends</li>
		<li>Pop out to new window</li>
		<li>Notes are kept on your device &mdash; we never touch your data</li>
	</ul>
</div>

<div class="grid md:grid-cols-2 my-10 md:my-0">
	<ul class="p-4 list-disc list-inside text-xl leading-relaxed my-auto">
		<li>Night mode</li>
		<li>Focus mode</li>
		<li>Works offline</li>
		<li>Ad free</li>
		<li>No in app purchases</li>
		<li>Less than 0.1mb</li>
	</ul>
	<img src="/img/projects/screenshots/chrome-notes-night.png" alt="chrome notes screenshot" />
</div>

<hr class="my-10" />

<h3 class="text-xl mt-10 mb-4">Also available for Edge and Firefox:</h3>

{#each ['Edge', 'Firefox'] as browser}
	<div class="flex flex-col md:flex-row justify-between gap-4 my-4">
		<a
			href={urls[browser.toLowerCase()]}
			target="_blank"
			rel="noreferrer"
			class="btn btn-primary no-underline"
		>
			Install {browser} Notes &nbsp; <Icon name="bag" />
		</a>

		<button
			class="btn btn-primary no-underline"
			on:click={() =>
				shareApp(
					`${browser} Notes`,
					`Check out ${browser} Notes, a simple notepad extension for ${browser}`,
					urls[browser.toLowerCase()]
				)}
		>
			Share {browser} Notes &nbsp; <Icon name="share" />
		</button>
	</div>
{/each}

<hr class="my-10" />

<div class="flex flex-col md:flex-row justify-between gap-4">
	<a
		href={urls.chrome}
		target="_blank"
		rel="noreferrer"
		class="btn btn-lg btn-primary no-underline"
	>
		Install Chrome Notes &nbsp; <Icon name="bag" />
	</a>

	<button
		class="btn btn-lg btn-primary no-underline"
		on:click={() =>
			shareApp(
				'Chrome Notes',
				'Check out Chrome Notes, a simple notepad extension for Google Chrome',
				urls.chrome
			)}
	>
		Share Chrome Notes &nbsp; <Icon name="share" />
	</button>
</div>

<style>
	.btn {
		background-color: #f90;
		border: 0;
	}
	.btn:hover {
		background-color: #f36;
	}
</style>
