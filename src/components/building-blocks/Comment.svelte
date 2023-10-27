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
	let mounted = false
    let focusOn

    async function rating(commentID, like, dislike) {
		// const payload: Object = {}
		// payload[type] = current + 1

		// const { data, error } = await supabase
		// 	.from('comments')
		// 	.update(payload)
		// 	.eq('id', commentID)
		const payload = {
			comment_id: commentID,
			user_id: userID,
			like: like,
			dislike: dislike
		}
		const { data: existingRating } = await supabase
			.from('comment_ratings')
			.select('*')
			.eq('comment_id', commentID)
			.eq('user_id', userID)
			.single()

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

		// const { data, error } = await supabase
		// .from("comment_ratings")
		// .insert(payload)

		//getComments()

		//f(error) console.log(error)
	}

	async function deleteComment(commentID) {
		const { data, error } = await supabase
			.from('comments')
			.delete()
			.eq('id', commentID)
			.eq('user_id', userID)

		if (error) console.log(error)
	}

	function toggleCommentBox(commentID) {
		if (showCommentBox) {
			showCommentBox = null
		} else {
			showCommentBox = commentID
		}
        focusOn.focus()
	}

	onMount(() => {
		mounted = true
	})
</script>

{#if mounted}
	{#each comments as comment}
        <div class="ml-4 h-fit border-l-2 border-l-gray-500 p-4">
			<div class="flex flex-row items-center gap-4">
                <!-- <div class="w-6 h-6"></div> -->
				<div class="text-base text-violet-500">{comment.profiles.username}</div>
				<div class="text-sm">
					{new Date(comment.created_at).toLocaleString('en-FI', {
						dateStyle: 'short',
						timeStyle: 'short'
					})}
				</div>
			</div>

			<p class="pl-4">{comment.comment}</p>

            <div class="flex flex-row items-center gap-2">
                <!-- LIKE -->
                <button
                    disabled={!username}
                    class="contents rounded disabled:opacity-50"
                    on:click={() => rating(comment.id, true, false)}
                >
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
                    <div>{comment.likes}</div>
                </button>
                <div class="h-6 border border-l-white"></div>
        
                <!-- DISLIKE -->
                <button
                    disabled={!username}
                    class="contents rounded disabled:opacity-50"
                    on:click={() => rating(comment.id, false, true)}
                >
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
                    <div>{comment.dislikes}</div>
                </button>
        
                <div class="h-2 w-2 rounded-full bg-white"></div>
        
                <!-- REPLY -->
                <button
                    class="contents rounded disabled:opacity-50"
                    on:click={() => toggleCommentBox(comment.id)}
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
        
                <!-- DELTE -->
                <div class="w-4"></div>
                {#if userID == comment.user_id}
                    <button
                        class="contents rounded p-2 text-red-600 hover:bg-red-600 hover:text-white"
                        on:click={() => deleteComment(comment.id)}
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

            {#if showCommentBox == comment.id}
                <div class="pl-8">
                    <CommentWriter {slug} {postID} replyTo={comment.id} {focusOn} />
                </div>
            {/if}

			<!-- Use a recursive function to display replies under their parent comment -->
			<!-- Recursively display replies under their parent comment -->
			{#if comment.children}
                
                    <svelte:self comments={comment.children} {username} {userID} {slug} {postID} />
			{/if}
		</div>
	{/each}
{/if}
