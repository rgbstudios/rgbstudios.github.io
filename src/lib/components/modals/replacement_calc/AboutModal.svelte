<script>
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="replacement-calc-about-modal" showCloseBtn>
	<div slot="title">Picking without replacements</div>
	View the data as pie and bar charts, where the odds of
	<ul>
		<li>
			<span class="text-brand-blue font-bold">exactly k items is represented in blue</span>,
		</li>
		<li>
			<span class="text-brand-red font-bold">less than k items is represented in red</span>, and
		</li>
		<li>
			<span class="text-brand-green font-bold"> greater than k items is represented in green </span>
		</li>
	</ul>

	<br />

	<p>
		Note that we limit input to 1000. This is because when calculating n choose k for inputs of 1000
		and 500, we get about 1e300, which is a number larger than should ever been needed, and is just
		approaching the largest number Javascript will store.
	</p>
	<p>
		To put this into perspective: Say we take every particle in the known universe and multiply that
		number by the number of nanoseconds the universe has been alive. This number squared is
		significantly less than 1e300.
	</p>
</Modal>
