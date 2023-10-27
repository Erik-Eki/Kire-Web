<script lang="ts">
    import CommentWriter from '$components/building-blocks/CommentWriter.svelte'

    export let c
    export let username
    export let userID
    export let slug
    export let postID

    let showCommentBox

    function toggleCommentBox(commentID) {
		if (showCommentBox) {
			showCommentBox = null
		} else {
			showCommentBox = commentID
		}
	}
</script>

<div class="rounded bg-black bg-opacity-50 p-4">
    <div class="flex flex-row items-center gap-4">
        <div class="text-base text-violet-500">{c.profiles.username}</div>
        <div class="text-sm">
            {new Date(c.created_at).toLocaleString('en-FI', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}
        </div>
    </div>

    <p class="pl-4">{c.comment}</p>

    <div class="flex flex-row items-center gap-2">
        <!-- LIKE -->
        <button
            disabled={!username}
            class="contents rounded disabled:opacity-50"
            on:click={() => rating(c.id, true, false)}
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
            <div>{c.likes}</div>
        </button>
        <div class="h-6 border border-l-white"></div>

        <!-- DISLIKE -->
        <button
            disabled={!username}
            class="contents rounded disabled:opacity-50"
            on:click={() => rating(c.id, false, true)}
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
            <div>{c.dislikes}</div>
        </button>

        <div class="h-2 w-2 rounded-full bg-white"></div>

        <button
            class="contents rounded disabled:opacity-50"
            on:click={() => toggleCommentBox(c.id)}
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

        <div class="w-4"></div>
        {#if userID == c.user_id}
            <button
                class="contents rounded p-2 text-red-600 hover:bg-red-600 hover:text-white"
                on:click={() => deleteComment(c.id)}
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
    {#if showCommentBox == c.id}
        <div class="pl-8">
            <CommentWriter {slug} {postID} replyTo={c.id} />
        </div>
    {/if}
</div>