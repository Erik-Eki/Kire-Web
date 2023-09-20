<script lang="ts">
    export let todos;

    let newTask: string;

    function addTask(task) {
        if (task) {
            todos = [...todos, task]
        } else {
            alert("Please type something before adding.")
        }
        // Svelte doesn't update state on .push() and such
        
    }
    function removeTask(taskIndex: Number) {
        todos.splice(taskIndex, 1)
        todos = todos
        // todos = [...todos.splice(taskIndex, 1)]
    }
</script>

<div>Ebin TODO List
    <ul class="grid gap-y-4 mb-3 mt-3 p-2 rounded bg-slate-800 shadow-slate-950 shadow-md">
        {#if todos.length === 0}
            <li class="flex flex-row">Nothing here...</li>
        {/if}
        {#each todos as i, index}
            <li class="flex flex-row">
                <button value={index} on:click={(e) => removeTask(e.target.value)} class="mr-5 p-1 w-9 h-9 leading-3 text-orange-600 font-extrabold border-2 border-orange-600 rounded">X</button>
                <p class="self-end">{index}. {i}</p>
            </li>
        {/each}
    </ul>
    <input bind:value={newTask} class="bg-transparent text-white border-2 rounded p-2">
    <button on:click={() => addTask(newTask)} class="p-2.5 m-1 rounded bg-orange-600">Add</button>
</div>