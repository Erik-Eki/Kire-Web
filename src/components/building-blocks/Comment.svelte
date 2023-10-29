<script lang="ts">
	import CommentWriter from '$components/building-blocks/CommentWriter.svelte'
	import { onMount } from 'svelte'
	import { supabase } from '$lib/supabaseClient'

	export let comments = []
	export let username
	export let userID
	export let slug
	export let postID

	let showCommentBox
	let mounted: Boolean = false
	let focusOn: String | null = null
	let currentlyReplyingTo: String | null = null
    let showDeleteModal = false;

	async function rating(commentID, like, dislike) {
		const payload = {
			comment_id: commentID,
			user_id: userID,
			like: like,
			dislike: dislike
		}
		const { data: existingRating, error } = await supabase
			.from('comment_ratings')
			.select('*')
			.eq('comment_id', commentID)
			.eq('user_id', userID)
			.single()
        if (error) console.error(error)

		if (existingRating) {
			// User has already rated this comment, update their rating
			await supabase
				.from('comment_ratings')
				.update({ like: like, dislike: dislike })
				.eq('id', existingRating.id)
		} else {
			// User has not yet rated this comment, insert new rating
			await supabase.from('comment_ratings').insert(payload)
		}
	}

	async function deleteComment(commentID) {
        const { data, error } = await supabase
            .from('comments')
            //.delete()
            .update({ comment: null, user_id: null })
            .eq('id', commentID)
            //.eq('user_id', userID)

        if (error) console.error(error)

        showDeleteModal = null
	}

    function handleUpdate(event) {
        currentlyReplyingTo = event.detail;
    }

	onMount(() => {
		mounted = true
	})
</script>

{#if mounted}
	{#each comments as comment}
		<div class="ml-4 h-fit border-l-2 border-l-gray-500 pl-4 pr-4 pt-4">
			<div class="flex flex-row items-center gap-4">
				<div class="text-base text-violet-500">{comment?.profiles?.username || "<unknown user>"}</div>
				<div class="text-sm">
					{new Date(comment.created_at).toLocaleString('en-FI', {
						dateStyle: 'short',
						timeStyle: 'short'
					})}
				</div>
			</div>

            {#if comment.comment}
			    <p class="pl-4 whitespace-pre-wrap">{comment.comment}</p>
            {:else}
                <p class="pl-4 whitespace-pre-wrap text-gray-400">{"<comment deleted by user>"}</p>
            {/if}

			<div class="flex flex-row items-center gap-2">
				<!-- LIKE -->
				<button
					disabled={!username}
					class="contents rounded disabled:opacity-50"
					on:click={() => rating(comment.id, true, false)}
				>
					<!-- FILLED IF RATING FROM USER -->
					{#if comment.likedByCurrentUser}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="#18a730"
								d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12Z"
							/></svg
						>
						<!-- EMPTY IF NO RATING FROM USER -->
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"
							/></svg
						>
					{/if}
					<div>{comment.likes}</div>
				</button>
				<div class="h-6 border border-l-white"></div>

				<!-- DISLIKE -->
				<button
					disabled={!username}
					class="contents rounded disabled:opacity-50"
					on:click={() => rating(comment.id, false, true)}
				>
					<!-- FILLED IF RATING FROM USER -->
					{#if comment.dislikedByCurrentUser}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="#5c2fff"
								d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2Z"
							/></svg
						>
						<!-- EMPTY IF NO RATING FROM USER -->
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M19 15V3h4v12h-4M15 3a2 2 0 0 1 2 2v10c0 .55-.22 1.05-.59 1.41L9.83 23l-1.06-1.06c-.27-.27-.44-.64-.44-1.06l.03-.31l.95-4.57H3a2 2 0 0 1-2-2v-2c0-.26.05-.5.14-.73l3.02-7.05C4.46 3.5 5.17 3 6 3h9m0 2H5.97L3 12v2h8.78l-1.13 5.32L15 14.97V5Z"
							/></svg
						>
					{/if}
					<div>{comment.dislikes}</div>
				</button>

				<div class="h-2 w-2 rounded-full bg-white"></div>

				<!-- REPLY -->
				{#if currentlyReplyingTo == comment.id}
					<button
						class="contents rounded text-red-500 disabled:opacity-50"
						on:click={() => (currentlyReplyingTo = null)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m0 15.2L18.8 16H4V4h16v13.2Z"
							/></svg
						>
						<div class="text-sm">Discard</div>
					</button>
				{:else}
					<button
						class="contents rounded disabled:opacity-50"
						on:click={() => (currentlyReplyingTo = comment.id)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m0 15.2L18.8 16H4V4h16v13.2Z"
							/></svg
						>
						<div class="text-sm">Reply</div>
					</button>
				{/if}

				<!-- DELETE -->
				<div class="w-4"></div>
				{#if userID == comment.user_id}
					<button
						class="contents rounded p-2 text-red-600 hover:bg-red-600 hover:text-white"
						on:click={() => showDeleteModal = comment.id}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
							><path
								fill="currentColor"
								d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12m2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12M15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5Z"
							/></svg
						>
						<div>Delete</div>
					</button>
				{/if}
			</div>
            {#if showDeleteModal == comment.id}
                <div class="w-fit bg-black bg-opacity-30 border border-red-700 rounded p-4 m-2">
                    <div>Are you sure you want to delete your comment?</div>
                    <button class="p-2 w-20 bg-red-800 text-white rounded-l" on:click={() => deleteComment(comment.id)}>Yes</button>
                    <button class="p-2 w-20 bg-gray-600 text-white rounded-r" on:click={() => showDeleteModal = null}>No</button>
                </div>
            {/if}

			{#if currentlyReplyingTo == comment.id}
				<div class="pl-8">
					<CommentWriter on:update={handleUpdate} {slug} {postID} {currentlyReplyingTo} focusOn={true} />
				</div>
			{/if}

			<!-- Recursively display replies under their parent comment -->
			{#if comment.children}
				<svelte:self comments={comment.children} {username} {userID} {slug} {postID} />
			{/if}
		</div>
	{/each}
{/if}

<style>
	.kakka {
		color: #18a730;
	}
</style>
