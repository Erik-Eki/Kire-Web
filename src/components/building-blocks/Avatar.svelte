<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { downloadImage, supabase } from '$lib/supabaseClient'

	export let url: string
	let uploading = false
	let files: FileList
	let avatarUrl;

	const dispatch = createEventDispatcher()

	const getImage = async (path) => {
		avatarUrl = await downloadImage(path)
	}

	const uploadAvatar = async () => {
		try {
			uploading = true

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${Math.random()}.${fileExt}`

			const { error } = await supabase.storage.from('avatars').upload(filePath, file)

			if (error) {
				throw error
			}

			url = filePath
			dispatch('upload')
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			uploading = false
		}
	}

	//$: if (url) avatarUrl = downloadImage(url)
	$: if (url) getImage(url)

	

  //style="height: 20rem, width: 20rem"
  // <p class=" bg-gray-500 text-2xl text-white">?</p>
</script>

<div class="flex flex-col gap-2 w-fit" aria-live="polite">
	<div class="cover">
		{#if avatarUrl}
			<img
				src={avatarUrl}
				alt={avatarUrl ? 'Avatar' : 'No image'}
			/>
		{:else}
			<svg class="bg-gray-600" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
		{/if}
	</div>


	<div
		class="whitespace-nowrap rounded bg-emerald-700 p-2 text-white hover:bg-emerald-500"
	>
		<label for="single">
			<div>{uploading ? 'Uploading ...' : 'Upload avatar'}</div>
			<input
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={uploadAvatar}
				disabled={uploading}
			/>
		</label>
		
	</div>
</div>

<style>
  .cover img, svg {
      width: 20rem !important;
      height: 20rem !important;
      border-radius: 100%;
      object-fit: cover;
      overflow: hidden;
      border: 1px solid black;
  }
</style>
