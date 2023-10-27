<script lang="ts">
	import { onMount, afterUpdate } from 'svelte'
	import { getProfile, supabase } from '$lib/supabaseClient'
	import type { AuthSession } from '@supabase/supabase-js'
	import { currentUserProfile } from '$components/stores/profile'
	import { createEventDispatcher } from 'svelte'

	export let slug: String
	export let postID: String
	//export let replyTo: String | null = null
	export let focusOn
	export let currentlyReplyingTo: String | null = null

	let session: AuthSession

	let inputElement
	let username
	let userID
	let comment = ''
	let loading = false

	const dispatch = createEventDispatcher();

	// focus the input whenever 'focus' changes to true
	$: if (focusOn) {
        // In Svelte, the DOM element might not be available immediately. So we only focus when it's ready.
        if (inputElement) inputElement.focus();
		// afterUpdate(() => {
        //     inputElement.focus();
        // });
	}

	onMount(async () => {
		//focusOn.focus()

		// Listen to changes in the store, and show/hide the dialog accordingly
		currentUserProfile.subscribe((n) => {
			if (n.user_id) {
				username = n.username
				userID = n.user_id
			}
		})
	})

	// function handleSubmit() {
	//     dispatch("submit", comment);
	//     comment = ""; // clear the input
	// }

	async function handlePostComment() {
		const formattedComment = comment.replace('\r\n', '\\r\\n')

		const commentData = {
			post_id: postID,
			post_slug: slug,
			//user_id: currentUserProfile.get()?.username,
			user_id: userID,
			comment: formattedComment,
			reply_to: currentlyReplyingTo,
			//created_at: new Date(),
			updated_at: new Date()
		}

		const { data, error } = await supabase.from('comments').insert(commentData)
		if (error) console.error(error)

		comment = ''
		focusOn = false

        currentlyReplyingTo = null
        dispatch("update", currentlyReplyingTo)
	}
</script>

<div>
	{#if username}
		<div class="flex flex-col">
			<div class="text-base">
				Comment as <a href="/profile" class="text-violet-400">{username}</a>
			</div>
			<label>
				<textarea
					bind:this={inputElement}
					bind:value={comment}
					placeholder="Here are my thoughts..."
					class="h-40 max-h-96 w-full rounded border-2 border-white bg-transparent pl-4 pr-4 pt-1"
				></textarea>
			</label>
			<button
				disabled={!comment}
				type="submit"
				on:click={() => handlePostComment()}
				class="w-fit self-end rounded-full bg-violet-800 pl-6 pr-6 text-white hover:bg-violet-500 disabled:bg-gray-500"
			>
				Comment
			</button>
		</div>
	{:else}
		<h2>Please login to comment.</h2>
	{/if}
</div>
