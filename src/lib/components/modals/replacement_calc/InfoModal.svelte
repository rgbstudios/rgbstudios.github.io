<script>
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="replacement-calc-info-modal" showCloseBtn>
	<div slot="title">Picking without replacements</div>
	<p>
		When picking n items out of N total items, where m of them are distinct, the odds of picking
		<i>exactly</i>
		k distinct items is defined as:
		<br />P(X = k) = <sub>m</sub>C<sub>k</sub> * <sub>N-m</sub>C<sub>n-k</sub> /
		<sub>N</sub>C<sub>n</sub>
		<br />
		<br />Where <sub>n</sub>C<sub>x</sub> ("n choose x") is defined as
		<br /><sub>n</sub>C<sub>x</sub> = n! / [ x! (n - x)! ]
		<br />
		<br />Mean: n * m / N
	</p>

	<div class="divider" />

	<p>Inputs should be positive integers. Non-integer inputs will be rounded down.</p>

	<p>
		Picking wihtout replacement means that once you've picked your item, you do not put it back into
		the pool of items to pick before picking the next item
	</p>

	<div class="divider" />

	<p>
		<a
			class="link"
			href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
			target="_blank"
		>
			Wikipedia on Hypergeometric Distributions
		</a>
	</p>
	<p>
		<a class="link" href="https://en.wikipedia.org/wiki/Simple_random_sample" target="_blank">
			Wikipedia on Simple Random Samples
		</a>
	</p>
	<p>
		<a class="link" href="https://en.wikipedia.org/wiki/Urn_problem" target="_blank">
			Wikipedia on the Urn Problem
		</a>
	</p>

	<br />
	<p>
		<a
			class="link"
			href="https://web.ma.utexas.edu/users/parker/sampling/woreplshort.htm"
			target="_blank"
		>
			UTexas provides formulas for sampling with and without replacement
		</a>
	</p>
</Modal>
