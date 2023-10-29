<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  let groupName: string = '';
  let userName: string = '';
  let members: object = [];

  async function onSubmit(e: object) {
    const {data, error: groupError} = await supabase
    .from("groups")
    .insert({
      "name": groupName,
      "created_by": userName,
    })
    .select()
    .select("id")
    .single()

    if (groupError) {
      console.error(groupError)
      return
    }
    if (!data) {
      console.error("No data returned")
      return
    }

    const { error: membersError} = await supabase
      .from("members")
      .insert(members.map((name) => ({ name, selected_by: null, group_id: data.id })))

    if (membersError) {
      console.error(membersError)
      return
    }
  }

  function onDelete(value: string) {
    members = members.filter(m => m !== value)
  } 
</script>

<form 
  class="flex flex-col p-4" 
  on:submit|preventDefault={onSubmit}
>
<!-- <form on:submit|preventDefault={onSubmit}> -->
  <div>
    <label for="name">
      Email
      <input
        type="text"
        id="groupName"
        name="groupName"
        bind:value={groupName}
        on:input={e => {groupName = e.target.value}}
      />
    </label>
  </div>
  <div>
    <label for="name">
      Username
      <input
        type="text"
        id="userName"
        name="userName"
        bind:value={userName}
        on:input={e => {userName = e.target.value}}
      />
    </label>
  </div>
  <div>
    <button
      class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8"
    >
      Submit
    </button>
    <!-- <button type="submit" class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8">Submit</button> -->
  </div>


  <h3 class="mt-1 text-xl font-black tracking-tight text-pink-700 text-center">
    Members
  </h3>

  <ul class="flex flex-col">
    {#each members as memberName, personIdx}
      <div class="flex flex-row">
        <div
          class="bg-white p-4"
          id="{personIdx}-{memberName}"
          title={memberName}
        >
          {personIdx}. {memberName}
        </div>
        <button type="button" class=" text-red-700 font-bold bg-white p-4" on:click={() => onDelete(memberName)}>
          X
        </button>
      </div>
    {/each}
  </ul>
</form>

 <style>
  * {
     box-sizing: border-box;
   }
   form {
     display: flex;
     flex-direction: column;
     width: 300px;
   }

   form > div{
     color: white;
     display: flex;
     justify-content: space-between;
   }

   input {
    color: black;
  }

   form > div + * {
     margin-top: 10px;
   }
</style>