<script lang="ts">
	import { onMount, afterUpdate } from 'svelte'
	import { getProfile, supabase } from '$lib/supabaseClient'
	import type { AuthSession } from '@supabase/supabase-js'
	import { currentUserProfile } from '$components/stores/profile'
	import { createEventDispatcher } from 'svelte'

	export let slug: string
	export let postID: string
	export let userID: string
	export let username: string
	export let replyTo: string | null = null
	export let focusOn
	export let originalComment
	export let currentlyReplyingTo: string | null = null
	export let comment: string | null = null
	export let commentID: string | null = null
	
	//export let editing: Boolean = false

	let session: AuthSession

	let inputElement
	let loading = false

	const dispatch = createEventDispatcher();

	$: username
	// focus the input whenever 'focus' changes to true
	$: if (focusOn && !originalComment) {
        // In Svelte, the DOM element might not be available immediately. So we only focus when it's ready.
        if (inputElement) inputElement.focus();
		// afterUpdate(() => {
        //     inputElement.focus();
        // });
	}

	// onMount(async () => {
	// 	//focusOn.focus()

	// 	// Listen to changes in the store, and show/hide the dialog accordingly
	// 	// currentUserProfile.subscribe((n) => {
	// 	// 	if (n.user_id) {
	// 	// 		username = n.username
	// 	// 		userID = n.user_id
	// 	// 	}
	// 	// })
	// })

	async function handlePostComment() {
		const formattedComment = comment.replace('\r\n', '\\r\\n')

		const commentData = {
			post_id: postID,
			post_slug: slug,
			user_id: userID,
			comment: formattedComment,
			reply_to: currentlyReplyingTo ? currentlyReplyingTo : replyTo,
			updated_at: new Date()
		}
		if (commentID) {
			const { error } = await supabase.from('comments').update(commentData).eq('id', commentID)
			if (error) console.error(error)
		}
		else {
			const { error } = await supabase.from('comments').insert(commentData)
			if (error) console.error(error)
		}

		
		

		comment = null
		focusOn = false

        currentlyReplyingTo = null
        dispatch("update", currentlyReplyingTo)
	}
</script>

<div>
	{#if username}
		<div class="flex flex-col">
			<div class="text-base">
				Comment as <a href="/account/profile" class="text-violet-400">{username}</a>
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
