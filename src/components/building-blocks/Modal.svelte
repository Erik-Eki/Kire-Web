<script lang="ts">
	import { fade } from 'svelte/transition'

	export let showModal // boolean

	let dialog // HTMLDialogElement

	$: if (dialog && showModal) {
		dialog.showModal()
	} else if (dialog && !showModal) {
		dialog.close()
	}
	// $: if (!showModal) dialog.close()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

<!-- {#if showModal} -->
	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
		transition:fade
	>
		<!-- <label>
		<input type="checkbox" bind:checked={showModal} />
		visible
	</label>

	{#if showModal}
		<div transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</div>
	{/if} -->

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<slot name="header" />
			<slot />
			<hr />
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>Close</button>
		</div>
	</dialog>
<!-- {/if} -->

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		position: absolute;
		left: 50%;
		top: 2rem;
		transform: translate(-50%, 0);
		margin: 0; /*reset some browser centering*/
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	/* dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	dialog[close] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	dialog[close]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	} */
	button {
		display: block;
	}
</style>
