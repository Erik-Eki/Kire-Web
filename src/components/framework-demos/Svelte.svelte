<script lang="ts">
    import SvelteTodo from "./SvelteTodo.svelte"

	let counter: number = 0
	$: doubled = counter * 2 //  re-run this code whenever any of the referenced values change

	let turboMode: Boolean = false

	$: if (counter >= 10) {
		turboMode = true
	} else {
		turboMode = false
	}

	function increment() {
		counter += 1
	}
	function decrement() {
		counter -= 1
	}


    let todos: Array = ["Commit taxfraud in Spain."]
</script>

<div class=" grid gap-y-14">
    <p>Number of tasks: {todos.length}</p>
    <SvelteTodo todos={todos}/>

	<div>
		Ebin counter
		<h2>
			Clicked: {counter}
			{counter === 1 ? 'time' : 'times'}
		</h2>
		<div class="flex flex-row">
			<button on:click={() => decrement()} class="bt">-</button>
			<button on:click={() => increment()} class="bt">+</button>
		</div>
		<p>The count doubled is {doubled}</p>
		{#if turboMode}
			<p class="font-extrabold text-red-600">Turbo Mode Activated!!!!</p>
		{/if}
	</div>
</div>

<style>
	.bt {
		background-color: blueviolet;
		border-radius: 10px;
		padding: 10px;
		margin: 10px;
		width: 50px;
		height: 50px;
	}
</style>
