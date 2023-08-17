<script lang="ts">
    import { onMount } from 'svelte';
    let result;
  
    async function drawPerson(){
      //todo: handle draw
      result = "Alex";
    };
  
    const group = {name: 'example group', createdBy: 'John Doe', id: '123'};
    const members = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}];
    const userName = "Bob";
  
  
    let isAnimating = false;
  
    onMount(() => {
      isAnimating = true;
    })
  </script>
  
  <div>
    <h1 class="mt-1 text-5xl font-black tracking-tight text-gray-700">
      Welcome to {group.name}, {userName}!
    </h1>
    <div class="flex justify-start my-6 items-center">
      <button on:click={drawPerson}>DRAW A NAME</button>
    </div>
    <dl>
      <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
        <dt class="font-bold text-gray-500">Group URL</dt>
        <dd class="mt-1 text-gray-900 sm:col-span-2 sm:mt-0 flex items-center">
          https://everybody.gives/{group.id}
        </dd>
      </div>
      <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
        <dt class="font-bold text-gray-500">Created by</dt>
        <dd class="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
          {group.createdBy}
        </dd>
      </div>
    </dl>
    <ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-6">
      {#each members as member}
      <div
        id={member.name}
        title={member.name}
        class={result === member.name
          ? (isAnimating ? 'animate-[wiggle_1s_ease-in-out_infinite] bg-action' : 'bg-action scale-120')
          : (result !== member.name && result ? 'bg-background opacity-50' : 'bg-background')
        }
      />
      {/each}
    </ul>
  </div>