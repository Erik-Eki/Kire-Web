<script lang="ts">
	import { onMount } from 'svelte'
	import { supabase } from '$lib/supabaseClient'
	import { currentUserProfile } from '$components/stores/profile'
	import CommentWriter from '$components/building-blocks/CommentWriter.svelte'
	import Comment from './Comment.svelte'
	//import type { AuthSession } from '@supabase/supabase-js'
	//import { currentUserProfile } from '$components/stores/profile'

	export let slug: String
	export let postID: String

	let comments
	let tree
	let username
	let userID
	let admin
	let commentCount: number = 0


	function createTreeStructure(comments, parent_id) {
		var tree = []
		var length = comments.length
		for (var i = 0; i < length; i++) {
			if (comments[i].reply_to === parent_id) {
				var children = createTreeStructure(comments, comments[i].id)
				if (children.length) {
					comments[i].children = children
				}
				tree.push(comments[i])
			}
		}

		return tree
	}

	async function getComments() {
		const { data, error } = await supabase
			.from('comments')
			.select('*, profiles (username), comment_ratings(like, dislike, user_id)')
			.eq('post_id', postID)
			.order('created_at', { ascending: false })

		if (error) console.log(error)

		data.reduce((acc, row) => {
			if (row.comment_ratings) {
				row.likes = 0
				row.dislikes = 0
				row.likedByCurrentUser = false
				row.dislikedByCurrentUser = false
				for (let i of row.comment_ratings) {
					if (i.like) {
						row.likes += 1

						if (i.user_id === userID) row.likedByCurrentUser = true
					}
					if (i.dislike) {
						row.dislikes += 1

						if (i.user_id === userID) row.dislikedByCurrentUser = true
					}
				}
			}
			acc.push(row)

			return acc
		}, [])

		let tree = createTreeStructure(data, null)

		comments = tree
		commentCount = data.length
	}

	onMount(async () => {
		getComments()

		currentUserProfile.subscribe((n) => {
			username = n.username
			userID = n.user_id
			admin = n.admin
		})

		//await tick();

		supabase
			.channel('comment_watchdog')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'comments' },
				(payload) => {
					console.log('New comment!', payload)
					getComments()
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'comments' },
				(payload) => {
					console.log('Comment got deleted...', payload)
					getComments()
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'comments' },
				(payload) => {
					console.log('Comment got updated...', payload)
					getComments()
				}
			)
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'comment_ratings' },
				(payload) => {
					console.log('Comment got rated...', payload)
					getComments()
				}
			)
			.subscribe()

	})
</script>

<div>
	<CommentWriter {slug} {postID} {userID} {username} focusOn={true} originalComment={true}/>

	<h2 class="mt-0 pt-0">Comments: {commentCount}</h2>
	<hr />
	{#if comments}
		<div class="flex flex-col gap-4">
			<Comment {comments} {username} {userID} {admin} {slug} {postID} />
		</div>
	{:else}
		<div>Be the first to commment :)</div>
	{/if}
	<hr />
</div>