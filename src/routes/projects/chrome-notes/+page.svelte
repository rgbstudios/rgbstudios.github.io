<script>
	import Carousel from '$lib/components/base/Carousel.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import { shareApp } from '$lib/components/ShareButtons.svelte';

	const slides = [
		'chrome-notes-store-1.png',
		'chrome-notes-store-0.png',
		'chrome-notes-store-2.png',
		'chrome-notes-store-3.png'
	];

	const urls = {
		chrome:
			'https://chrome.google.com/webstore/detail/chrome-notes/lnfempckkegmaeleniojhjplemmebgfi',
		edge: 'https://microsoftedge.microsoft.com/addons/detail/edge-notes/fiigjfolhmeakepmplcmljcnonjggine',
		firefox: 'https://addons.mozilla.org/en-GB/firefox/addon/ff-notes/'
	};

	const reviews = [
		// {
		// 	stars: 5,
		// 	date: 'May 14, 2023',
		// 	author: 'Sidharth Vardhan',
		// 	quote:
		// 		'I hope developers try to develop this extensions. Not only this app has dark mode but also abilty to open in a separate window'
		// },
		{
			stars: 5,
			date: 'Feb 3, 2023',
			author: 'Hristo Mihovski',
			quote:
				'They are very handy when I do my projects for science and to write the most important stuff that I need. Love it!'
		},
		{
			stars: 5,
			date: 'Jan 27, 2023',
			author: 'Briana',
			quote:
				"A very nice note taking app! It has nice features like undo,  redo, titling notes, saving multiple notes at once, exporting, and even read aloud and spellcheck! It is super convenient for when I have an idea and don't want to loose it."
		},
		{
			stars: 5,
			date: 'Nov 11, 2022',
			author: 'Yum Yum',
			quote:
				'For me, this is the most simplest yet straight forward functionality. The feature I love the most that is not present in other web note is this can be opened in new window, completely detached from the web...floating anywhere in my desktop. Keep it up. '
		},
		{
			stars: 5,
			date: 'Sep 20, 2022',
			author: 'Mary Angel Pamintuan',
			quote: 'I use it for work and it is very helpful. I like the simplicity!'
		},
		{
			stars: 5,
			date: 'Jun 23, 2022',
			author: 'hello hello',
			quote:
				'This is sooo helpful! Thank you so much. The new feature of adding multiple notes is exactly what I wanted for this extension. Thanks!'
		},
		{
			stars: 5,
			date: 'Jan 14, 2022',
			author: 'Shekhar Singh',
			quote:
				'It is a great tool for anyone who just wants a simple and effective notepad with them whenever they need it the most. Great work devs.'
		},
		{
			stars: 5,
			date: 'Feb 22, 2021',
			author: 'Jenna Dos Ramos',
			quote:
				'Chrome notes is an free, easy fast way to take notes without registration or login. It is perfect for writing to-do lists and taking notes during online class or working from home. All my notes are saved and I absolutely love how there is a dark mode for those late night study sessions. Other helpful tools they offer include keyboard short cuts, deleting your current notepad, downloading the file, immersive reader, and copy paste buttons. Overall would rate 10/10!'
		},
		{
			stars: 5,
			date: 'Jan 8, 2020',
			author: 'Richard Alder',
			quote:
				'I’m really happy :). Your Note taking extension comes very light and  handy. It’s awesome.'
		},
		{
			stars: 5,
			date: 'Feb 8, 2019',
			author: 'nakamura 0',
			quote:
				'Finally found a fast, simple note app that’s free, requires no registration or logins, and doesn’t vacum personal data. If you don’t require bloated software for simple tasks, Chrome Notes is perfect.'
		}
	];
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

<div class="grid gap-4 lg:grid-cols-2 items-center bg-[#f36]/50 p-10 mb-10">
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
	<ul
		class="p-4 list-disc list-inside text-lg sm:text-xl leading-loose sm:leading-loose m-auto max-w-sm"
	>
		<li>Shortcut keys for cut, copy, paste, select all, delete, undo, redo</li>
		<li>Common keyboard shortcuts like ctrl+X, ctrl+C, ctrl+V work</li>
		<li>Download as text file</li>
		<li>Read note (or selection) out loud</li>
		<li>Spellcheck</li>
	</ul>
	<img
		class="mr-auto"
		src="/img/projects/screenshots/chrome-notes.png"
		alt="chrome notes screenshot"
	/>
</div>

<div class="grid md:grid-cols-2 my-10 md:my-0">
	<img
		class="order-1 md:order-0 ml-auto"
		src="/img/projects/screenshots/chrome-notes-menu.png"
		alt="chrome notes screenshot"
	/>
	<ul
		class="order-0 md:order-1 p-4 list-disc list-inside text-lg sm:text-xl leading-loose sm:leading-loose m-auto max-w-sm"
	>
		<li>Store multiple notes</li>
		<li>Custom font size</li>
		<li>Resize your notepad</li>
		<li>Share your notes with friends</li>
		<li>Pop out to new window</li>
		<li>Notes are kept on your device &mdash; we never touch your data</li>
	</ul>
</div>

<div class="grid md:grid-cols-2 my-10 md:my-0">
	<ul
		class="p-4 list-disc list-inside text-lg sm:text-xl leading-loose sm:leading-loose m-auto max-w-sm"
	>
		<li>Night mode</li>
		<li>Focus mode</li>
		<li>Works offline</li>
		<li>Ad free</li>
		<li>No in app purchases</li>
		<li>Less than 0.1mb</li>
	</ul>
	<img
		class="mr-auto"
		src="/img/projects/screenshots/chrome-notes-night.png"
		alt="chrome notes screenshot"
	/>
</div>

<div class="grid gap-10 md:gap-0 md:grid-cols-2 my-10 md:my-0">
	<img
		class="ml-auto"
		src="/img/projects/screenshots/chrome-notes-help.png"
		alt="chrome notes screenshot"
	/>
	<img
		class="mr-auto"
		src="/img/projects/screenshots/chrome-notes-focus-mode.png"
		alt="chrome notes screenshot"
	/>
	<img
		class="ml-auto"
		src="/img/projects/screenshots/chrome-notes-more-tips.png"
		alt="chrome notes screenshot"
	/>
	<img
		class="mr-auto"
		src="/img/projects/screenshots/chrome-notes-shortcuts.png"
		alt="chrome notes screenshot"
	/>
</div>

<hr class="my-10" />

<h3 class="text-center text-2xl my-4">60,000+ happy users, 100+ reviews and 4.5/5 stars average</h3>

<Carousel
	let:item={review}
	items={reviews.map((review, i) => ({ id: i, ...review }))}
	buttonStyle="secondary"
>
	<div class="text-center mx-16 mt-10 mb-20">
		<div class="flex justify-center text-[#f90] mb-6">
			{#each Array(review.stars) as _}
				<Icon name="star_fill" />
			{/each}
			{#each Array(5 - review.stars) as _}
				<Icon name="star" />
			{/each}
		</div>

		<div class="mx-10">
			<Icon name="quote" class="h-8" />
			<p class="text-xl my-2">{review.quote}</p>
			<Icon name="quote_end" class="h-8 ml-auto" />
		</div>
	</div>
</Carousel>

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

	li {
		list-style-image: url('/img/projects/icons/chrome-notes.svg');
	}
</style>
