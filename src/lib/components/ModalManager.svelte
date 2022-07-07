<script>
	// Copied from Desktop Clock

	import { close, modal } from '../util/modal';

	import Icon from './Icon.svelte';

	import ArithmeticModal from './modals/base_convert/ArithmeticModal.svelte';
	import LearnMoreModal from './modals/base_convert/LearnMoreModal.svelte';

	const modalData = {
		'base_convert/ArithmeticModal': {
			title: 'Arithmetic',
			icon: 'calculator',
			component: ArithmeticModal
		},
		'base_convert/LearnMoreModal': {
			title: 'Learn More',
			icon: 'lightbulb',
			component: LearnMoreModal
		}
	};

	let component, title, icon;
	$: {
		const modalName = $modal?.name;
		if (modalName) {
			({ component, title, icon } = modalData[modalName]);
		} else {
			({ component, title, icon } = {});
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') close();
	}}
/>

{#if component}
	<div class="modal-bg" on:mousedown={close}>
		<div class="modal-content surface rounded" on:mousedown|stopPropagation>
			<div class="modal-header">
				<button class="modal-close-btn" on:click={close} aria-label="Close">
					<Icon name="close" />
				</button>
				<h2 class="modal-heading">
					{#if icon}
						<Icon name={icon} />
					{/if}
					{title}
				</h2>
			</div>
			<div class="modal-body">
				<svelte:component this={component} />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal-bg {
		@apply sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-base-100 bg-opacity-50 z-20 overflow-auto;
	}
	.modal-content {
		@apply rounded border-2 bg-base-200 p-6 relative m-auto w-full md:w-3/4;
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}
	.modal-close-btn {
		@apply btn btn-ghost float-right btn-sm mt-0;
	}
	.modal-heading {
		@apply text-left mb-3;
	}
	.modal-header {
		@apply border-b-2 pb-6;
	}
	.modal-body {
		@apply text-left relative flex-1 overflow-auto mt-6;
	}

	@keyframes animateTop {
		from {
			top: -15rem;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -15rem;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
