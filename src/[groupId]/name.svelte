<script>
  import {onMount} from 'svelte';
  import Layout from "../layouts/Layout.astro";
  import { supabase } from "../lib/supabaseClient";
  
  const { groupId } = Astro.params;
  let members, error;

  async function fetchData() {
    const { data, error } = await supabase
      .from("members")
      .select("name")
      .eq("group_id", groupId);
    if (error) {
      console.error(error);
      throw error;
    }
    members = data.map((m) => m.name);
  }

  $: onMount(fetchData);
</script>

<Layout title="Select name">
  <div>
    <h1 class="mt-1 text-5xl font-black tracking-tight text-gray-700 text-center">
      Select your name
    </h1>
    <ul
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-10"
    >
      {#each members as member}
        <div
          href={`/${groupId}?user=${member}`}
          title={member}
          class="bg-background hover:scale-105"
        />
      {/each}
    </ul>
  <div>
</Layout>