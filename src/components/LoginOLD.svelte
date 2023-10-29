<script lang="ts">
  import { supabase } from "$lib/supabaseClient";

  async function signInWithGitHub() {
      const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
      })

      console.log("GITHUB:", data, error)
  }

  async function signout() {
    const { error } = await supabase.auth.signOut()
  }

  async function signInWithEmail(cred) {
    alert(JSON.stringify(cred))

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cred.email,
      password: cred.password,
    })

    alert(JSON.stringify(data))
  }

  async function fetchUserDetails() {
    const { data } = await supabase.auth.getUser()
  }


  function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    signInWithEmail(data)
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
        id="email"
        name="email"
        value=""
      />
    </label>
  </div>
  <div>
    <label for="name">
      Password
      <input
        type="password"
        id="password"
        name="password"
        value=""
      />
    </label>
  </div>
  <div>
    <button
      class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8"
      type="submit"
    >
      Log in
    </button>
    <!-- <button type="submit" class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8">Submit</button> -->
  </div>
</form>

<button
  class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8"
>
  Sign out
</button>

<button
  class=" text-white border-l-pink-600 outline rounded p-2 m-2 h-8"
  on:click={fetchUserDetails}
>
  Fetch user data
</button>