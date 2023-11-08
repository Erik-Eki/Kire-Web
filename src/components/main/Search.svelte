<script lang="ts">
	import { onMount } from 'svelte'
	const hxVals =
		'js:{"q": document.getElementById("search-input").value.length > 2 ? document.getElementById("search-input").value : null}'

	onMount(() => {
		window.dispatchEvent(new Event('astro-navigate'))
		window.addEventListener('astro-navigate', () => {
			htmx.process(document.body)
		})
	})
</script>

<!-- <script type="module">
	// I need to do this bullshit, as Astro handles client-side navigation.
	// When you navigate to a new page, Astro.js does a full page refresh,
	// which can cause issues with client-side libraries like HTMX
	// I have to listen to navigation events and reinit HTMX
	window.dispatchEvent(new Event('astro-navigate'))
	window.addEventListener('astro-navigate', () => {
		htmx.process(document.body)
	})
</script> -->

<!-- <svelte:window 
	dispatchEvent={(new Event("astro-navigate"))}
	addEventListener={
		('astro-navigate', () => {
			htmx.process(document.body)
		})
	}
/> -->

<div>
	<input
		type="text"
		id="search-input"
		hx-get="/api/search"
		hx-vals={hxVals}
		hx-trigger="keyup changed delay:500ms"
		hx-target="#search-result"
		hx-swap-oob="true"
		placeholder="Search content..."
		class="border-violet-80 mb-2 mt-2 w-full rounded border-2 bg-transparent p-2 text-white"
	/>

	<div id="search-result"></div>
</div>
