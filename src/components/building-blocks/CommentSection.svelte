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
    let commentCount: number = 0
	// let showCommentBox
	// let commentComponents
    let focusOn

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
			.select('*, profiles (username), comment_ratings(like, dislike)')
			.eq('post_id', postID)
			.order('created_at', { ascending: false })

		if (error) console.log(error)

		data.reduce((acc, row) => {
			if (row.comment_ratings) {
				row.likes = 0
				row.dislikes = 0
				for (let i of row.comment_ratings) {
					row.likes += i.like ? 1 : 0
					row.dislikes += i.dislike ? 1 : 0
				}
			}
			acc.push(row)

			return acc
		}, [])

		let tree = createTreeStructure(data, null)

		comments = tree
        commentCount = data.length
	}

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

		getComments()

		//f(error) console.log(error)
	}

	async function deleteComment(commentID) {
		console.log(commentID, userID)
		const { data, error } = await supabase
			.from('comments')
			.delete()
			.eq('id', commentID)
			.eq('user_id', userID)

		if (error) console.log(error)
	}

	onMount(async () => {
		getComments()

		currentUserProfile.subscribe((n) => {
			username = n.username
			userID = n.user_id
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

		//console.log("CHANNELS:", supabase.getChannels())
	})
</script>

<!-- <div>
	<h2 class="mt-0 pt-0">Comments: {comments ? comments.length : 0}</h2>
	<hr />
	{#if comments}
		<div class="flex flex-col gap-4">
            {#each commentComponents as c}
				
                <svelte:self {...c} />
			{/each}
			{#each comments as c}
				
			{/each}
		</div>
	{:else}
		<div>Be the first to commment :)</div>
	{/if}
	<hr />
</div> -->

<div>
    <CommentWriter slug={slug} postID={postID} {focusOn} />

	<h2 class="mt-0 pt-0">Comments: {commentCount}</h2>
	<hr />
	{#if comments}
		<div class="flex flex-col gap-4">
			<Comment {comments} {username} {userID} {slug} {postID} />
		</div>
	{:else}
		<div>Be the first to commment :)</div>
	{/if}
	<hr />
</div>

<!--
// async function createElement(props) {
	// 	const CustomElement = (await import('./CommentOLD.svelte')).default
	// 	return new CustomElement({
	// 		target: document.body,
	// 		props: {
	// 			...props
	// 		}
	// 	})
	// }

	// async function createCommentComponent(commentData) {
	// 	const element = await createElement(commentData)
	// 	for (let c of commentData.c.children) {
	// 		if (c.children) {
	// 			await createCommentComponent({ c: c.children, username, userID, slug, postID })
	// 		}
	// 		const child = await createElement(commentData)
	// 		//const elem = document.createElement(`${<Comment {c} {username} {userID} {slug} {postID}/>}`)
	// 		element.appendChild(child)
	// 	}
	//     console.log(element)
	// 	return element
	// }

	// var CommentComponent = {
	// 	props: ['comment'],
	// 	template: `
    //     <div>
    //         <p>{{comment.content}}</p>
    //         <ul>
    //             {#each comment.children as c}
    //                 <CommentComponent :comment="c"></CommentComponent>
    //             {/each}
    //         </ul>
    //     </div>
    // `
	// }

	// function createCommentComponent(comment) {
	// 	var children = comment.children || []
	// 	var childComponents = children.map(createCommentComponent)
	// 	return {
	// 		id: comment.id,
	// 		comment: comment.comment,
	// 		likes: comment.likes,
	// 		dislikes: comment.dislikes,
	// 		children: childComponents,
	// 		Component: CommentComponent
	// 	}
	// }

	//var tree2 = createTreeStructure(comments, null)

	// {#if c.children}
	//     {@html createCommentComponent({ c, username, userID, slug, postID })}
	//     <!-- <Comment {c} {username} {userID} {slug} {postID} /> 
	// {:else}
	//     {@html createElement({ c, username, userID, slug, postID })}
	//     <Comment {c} {username} {userID} {slug} {postID} /> 
	// {/if}
	// {@html c.Component.template}
-->
