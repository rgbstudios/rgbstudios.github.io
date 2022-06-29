<script>
	import Alert from '../../components/Alert.svelte';
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
	import Icon from '../../components/Icon.svelte';
	import SEO from '../../components/SEO.svelte';

	import copyText from '../../util/copyText';

	// Conversion

	let morVals = {
		'A': '.-',
		'B': '-...',
		'C': '-.-.',
		'D': '-..',
		'E': '.',
		'F': '..-.',
		'G': '--.',
		'H': '....',
		'I': '..',
		'J': '.---',
		'K': '-.-',
		'L': '.-..',
		'M': '--',
		'N': '-.',
		'O': '---',
		'P': '.--.',
		'Q': '--.-',
		'R': '.-.',
		'S': '...',
		'T': '-',
		'U': '..-',
		'V': '...-',
		'W': '.--',
		'X': '-..-',
		'Y': '-.--',
		'Z': '--..',
		'0': '-----',
		'1': '.----',
		'2': '..---',
		'3': '...--',
		'4': '....-',
		'5': '.....',
		'6': '-....',
		'7': '--...',
		'8': '---..',
		'9': '----.',
		'?': '..--..'
	};
	let engVals = {
		'.-': 'A',
		'-...': 'B',
		'-.-.': 'C',
		'-..': 'D',
		'.': 'E',
		'..-.': 'F',
		'--.': 'G',
		'....': 'H',
		'..': 'I',
		'.---': 'J',
		'-.-': 'K',
		'.-..': 'L',
		'--': 'M',
		'-.': 'N',
		'---': 'O',
		'.--.': 'P',
		'--.-': 'Q',
		'.-.': 'R',
		'...': 'S',
		'-': 'T',
		'..-': 'U',
		'...-': 'V',
		'.--': 'W',
		'-..-': 'X',
		'-.--': 'Y',
		'--..': 'Z',
		'-----': '0',
		'.----': '1',
		'..---': '2',
		'...--': '3',
		'....-': '4',
		'.....': '5',
		'-....': '6',
		'--...': '7',
		'---..': '8',
		'----.': '9',
		'..--..': '?'
	};

	function englishToMorse(str) {
		let rtn = '';
		for (const char in str) {
			if (str[char] == ' ') rtn += ' / ';
			else rtn += (morVals[str[char].toUpperCase()] || '') + ' ';
		}
		return rtn;
	}
	function morseToEnglish(str) {
		let rtn = '';
		const strs = str.split(' ');
		for (const item in strs) {
			if (strs[item] == '/') rtn += ' ';
			else if (strs[item] != '') rtn += engVals[strs[item]] || '';
		}
		return rtn;
	}

	let morseVal = '... --- ...',
		englishVal = 'SOS',
		searchVal = '';

	// Copy inputs

	let copiedMorse = false,
		copiedEnglish = false;

	let morseTimeout;
	function copyMorse() {
		copyText(morseVal);

		copiedMorse = true;
		clearTimeout(morseTimeout);
		morseTimeout = setTimeout(() => (copiedMorse = false), 2500);
	}

	let englishTimeout;
	function copyEnglish() {
		copyText(englishVal);

		copiedEnglish = true;
		clearTimeout(englishTimeout);
		englishTimeout = setTimeout(() => (copiedEnglish = false), 2500);
	}
</script>

<!-- TODO screenshot in SEO -->
<SEO
	title="Morse Code Converter | RGB Studios"
	description="Use Morse Code Converter to convert both ways between English and Morse code"
	keywords={[
		'morse code',
		'converter',
		'morse',
		'code',
		'convert',
		'to english',
		'to morse code',
		'english'
	]}
	icon="/img/projects/morse-convert.png"
/>

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Projects',
			link: '/projects'
		},
		{
			text: 'Morse Convert'
		}
	]}
/>

<article class="prose lg:prose-xl mx-auto">
	<img class="mx-auto" src="/img/projects/morse-convert.png" width="64px" alt="" />
	<h1 class="text-center">Morse Code Converter</h1>
</article>

<label for="english">English</label>
<div class="input-group">
	<button on:click={copyEnglish} title="Copy" type="button" class="btn btn-secondary">
		<Icon name={copiedEnglish ? 'check' : 'copy'} class="w-6 h-6" />
	</button>
	<input
		bind:value={englishVal}
		on:change={(e) => {
			morseVal = englishToMorse(e.target.value);
		}}
		id="english"
		type="text"
		class="input w-full max-w-xs input-bordered"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
	<button on:click={() => (englishVal = '')} title="Clear" type="button" class="btn btn-secondary">
		<Icon name="close" class="w-6 h-6" />
	</button>
</div>

<label for="morse">Morse</label>
<div class="input-group">
	<button on:click={copyMorse} title="Copy" type="button" class="btn btn-secondary">
		<Icon name={copiedMorse ? 'check' : 'copy'} class="w-6 h-6" />
	</button>
	<input
		bind:value={morseVal}
		on:change={(e) => {
			englishVal = morseToEnglish(e.target.value);
		}}
		id="morse"
		type="text"
		class="input w-full max-w-xs input-bordered"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
	<button on:click={() => (morseVal = '')} title="Clear" type="button" class="btn btn-secondary">
		<Icon name="close" class="w-6 h-6" />
	</button>
</div>
<br />

<Alert
	text="Space between characters are represented with spaces. Space between words are represented with
slashes ( / )"
/>

<p>Conversion Table</p>
<div class="input-group">
	<input
		bind:value={searchVal}
		type="text"
		class="input w-full max-w-xs"
		placeholder="Search the table..."
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
	<button title="Search" type="button" class="btn btn-secondary">
		<Icon name="search" class="w-6 h-6" />
	</button>
</div>

<div class="overflow-x-auto">
	<table class="table table-compact w-full">
		{#each Object.keys(morVals) as character}
			{#if searchVal.trim() === '' || searchVal
					.trim()
					.toUpperCase() === character || searchVal.trim() === morVals[character]}
				<tr>
					<td>{character}</td>
					<td>{morVals[character]}</td>
				</tr>
			{/if}
		{/each}
	</table>
</div>

<p>
	Read about Morse Code on
	<a class="link link-hover" href="https://en.wikipedia.org/wiki/Morse_code" target="_blank">
		Wikipedia
	</a>
	and
	<a class="link link-hover" href="https://morsecode.world/" target="_blank"> morsecode.world </a>
</p>

<!-- TODO share btns -->
