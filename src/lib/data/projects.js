const projects = [
	{
		title: 'Desktop Clock',
		text: 'A simple, resizable customizable, installable clock for any device!',
		img: 'https://desktopclock.app/img/screenshot.png',
		link: 'https://desktopclock.app/',
		tags: ['clock', 'stopwatch', 'worldclock', 'web app', 'tool', 'installable'],

		isNew: true,
		isPopular: true,
		isUpdated: true,

		longText:
			'Desktop Clock is a simple, resizable, customizable, installable clock for any device. Features include customizable analog and digital displays, night mode, themes, timezones and more. Desktop Clock is designed to scale perfectly to any screen size and ratio, with no distortion or pixelation. Use Desktop Clock as a clock on your TV, a night clock, or project the time in the classroom. Desktop Clock is super light-weight, works offline, free, ad-free, and always will be. Customize the time, date and more to your liking! Desktop Clock is the all-in-one clock for any of your timekeeping needs!',
		isFeatured: true
	},
	{
		// TODO: add sharethis
		// TODO: add edge notes and ff notes
		title: 'Chrome Notes',
		text: 'A simple notepad extension for Google Chrome',
		img: '/img/screenshots/chrome_notes.png',
		link: 'https://chrome.google.com/webstore/detail/chrome-notes/lnfempckkegmaeleniojhjplemmebgfi',
		tags: ['notepad', 'extension', 'tool', 'installable'],

		isPopular: true,
		isUpdated: true,

		longText:
			'Chrome Notes is a simple notepad extension with quick edit buttons, speak outloud, download, popout, night mode, and more',
		isFeatured: true
	},
	{
		// TODO: move https://color-convert.netlify.app/ to rgb domain
		// TODO: add sharethis
		title: 'Color Convert',
		text: 'A simple color converter and generator web app',
		img: 'img/screenshots/color_convert_old.png',
		link: 'https://rgbstudios.org/color-convert/',
		tags: ['color', 'converter', 'tool', 'web app', 'installable']
	},
	{
		// TODO: redo this site, link to other dnd sites
		title: 'D&D Dice',
		text: 'Use D&D Dice Roller to easily roll any number any dice, with modifiers and more',
		img: 'img/screenshots/dnd_dice_old.png',
		link: 'https://rgbstudios.org/dnd-dice/',
		tags: ['dnd', 'games', 'die roller', 'web app'],

		isPopular: true,

		longText:
			'Roll any number of dice with any sides, add modifiers, advantage, and more. Download or upload modifiers, see your roll history, and even roll a new character in seconds!',
		isFeatured: true
	},
	{
		title: 'Grade Calc',
		text: "Use Grade Calc to calculate students' grades quickly and simply",
		img: 'img/projects/screenshots/grade-calc.png',
		link: '/projects/grade-calc/',
		tags: ['grade calculator', 'calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		title: 'Base Converter',
		text: 'Convert numbers between binary, octal, decimal, hexadecimal, and more',
		img: 'img/projects/screenshots/base-convert.png',
		link: '/projects/base-convert/',
		tags: ['calculator', 'converter', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		title: 'Intersect Calc',
		text: 'Use Intersection Calc to calculate the intersection point of lines',
		img: 'img/projects/screenshots/intersect-calc.png',
		link: '/projects/intersect-calc/',
		tags: ['calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		// TODO minor cleanup
		title: 'Copylink',
		text: 'Copy the current link in one second!',
		img: 'img/screenshots/copylink.png',
		link: 'https://chrome.google.com/webstore/detail/copylink/hmbglhnodfegeiemefjoejkkmncdobde',
		tags: ['tool', 'browser extension']
	},
	{
		// TODO cleanup and add sharethis
		title: 'Doodle Pad',
		text: 'A simple website to doodle in your browser',
		img: 'img/projects/screenshots/doodle-pad.png',
		link: '/projects/doodle-pad/',
		tags: ['art', 'drawing', 'tool', 'web app']
	},
	{
		title: 'Morse Code Converter',
		text: 'Use Morse Code Converter to convert both ways between English and Morse code',
		img: 'img/projects/screenshots/morse-convert.png',
		link: '/projects/morse-convert/',
		tags: ['morse code', 'converter', 'tool', 'web app'],

		isUpdated: true
	},
	{
		// TODO cleanup and add sharethis
		title: 'Simple Shot',
		text: 'Take a screenshot with the clock of a button in your browser',
		img: 'img/screenshots/simple_shot.png',
		link: 'https://chrome.google.com/webstore/detail/simpleshot/hpnikgbjfhnpcaoicgbkkialbejlecke',
		tags: ['images', 'screenshot', 'tool', 'browser extension']
	},
	{
		title: 'Stat Calc',
		text: 'Use Stat Calc to calculate many statistics on a data set',
		img: 'img/projects/screenshots/stat-calc.png',
		link: '/projects/stat-calc/',
		tags: ['statistics', 'calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		title: 'Binomial Calc',
		text: 'Use Binomial Calc to calculate the probabilities of binomial distributions and see them represented by interactve graphs',
		img: 'img/projects/screenshots/binomial-calc.png',
		link: '/projects/binomial-calc/',
		tags: ['statistics', 'calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		title: 'Binomial Calc App',
		text: 'Use Binomial Calc to calculate the probabilities of binomial distributions and see them represented by interactve graphs',
		img: 'https://play-lh.googleusercontent.com/NfMpnt1CJr-jTu1tRf41YkxJtotDcd7DTfmnBpkU7YOkels6qIu6Zw9q4jZZBpopbw=w2560-h1440-rw',
		link: 'https://play.google.com/store/apps/details?id=org.rgbstudios.binomialdistributioncalculator',
		tags: ['statistics', 'calculator', 'educational', 'tool', 'android app', 'mobile app']
	},
	{
		// TODO cleanup and add sharethis
		title: 'Barcode Generator',
		text: 'Use Barcode Generator to generate a barcode for any text, then save or share the image. Generate a barcode for your Wifi for guests and more.',
		img: 'img/screenshots/barcode.png',
		link: 'https://rgbstudios.org/barcode',
		tags: ['barcode', 'tool', 'web app']
	},
	{
		title: 'Simple Grade Calc',
		text: 'Use Simple Grade Calc to easily calculate your grade',
		img: 'img/projects/screenshots/simple-grade-calc.png',
		link: '/projects/simple-grade-calc/',
		tags: ['grade calculator', 'calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	},
	{
		title: 'Replacement Calc',
		text: 'Use Replacement Calc to calculate the probabilities of picking a certain number of objects without replacement, such as picking marbles or cards',
		img: 'img/projects/screenshots/replacement-calc.png',
		link: '/projects/replacement-calc/',
		tags: ['statistics', 'calculator', 'educational', 'tool', 'web app'],

		isUpdated: true
	}

	// TODO: figure out songssearcher.com
];

export default projects;
