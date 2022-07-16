<script lang="ts">
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="grade-calc-info-modal">
	<div slot="title">Setup</div>
	<p>
		✅ Add as many assignments as you'd like, click "New Item" to add a new one,or the close button
		on the top of each assignment to remove it
	</p>
	<p>✅ Name your assignments to easily keep track of them</p>
	<p>
		✅ Assign weights to your assignments. If weights no not add up to 100, they will be weighted
		relative to each other, so if the total weights are 1000, then an assignment worth 200 will be
		worth 20%
	</p>
	<p>✅ Enter total scores those assignments are out of</p>
	<p>
		✅ Optional: Use the scale button titled "Same Weights" to make all assignments equally
		weighted.
	</p>
	<h3 class="border-b">Grading</h3>
	<p>✅ Click on the score of the first assignment and start with the first student's grade.</p>
	<p>
		✅ Enter their scores for each assignment and their name, then click "Calculate" to receive
		their final (or current) grade
	</p>
	<p>
		✅ Optional: Use <kbd>tab</kbd> and <kbd>shift + tab</kbd> to easily navigate the student grade inputs,
		so you can quickly enter students' grades.
	</p>
	<p>✅ Optional: You can click the "Clear" button to clear the inputs for the next student.</p>
	<h3 class="border-b">Other Features</h3>
	<p>
		✅ The top right corner features a night mode button, to darken the screen for late night
		grading, a refresh button to reload the page, and a fullscreen button, to give you more space to
		work with
	</p>
	<p>
		✅ The bottom of the page features a history log, so you can view all of the students' grades at
		once when you're done.
	</p>
</Modal>
