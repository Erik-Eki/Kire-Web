<script lang="ts">
	import { supabase } from '$lib/supabaseClient'
	import { onMount } from 'svelte'
	import { currentUserProfile } from '$components/stores/profile'

	export let slug

	let username
	let userID
	let postID: String
	let currPostRatings: Object
	let pageViews: number = 0
	let likes = 0
	let dislikes = 0

	async function incrementViews(slug) {
		const { data, error } = await supabase.rpc('increment_page_view', { page_slug: slug })
		if (error) console.error(error)

		// if (request.method === 'GET') {
		//   // Query the pages table in the database where slug equals the request params slug.
		//   const { data } = await supabase.from('posts').select('view_count').filter('slug', 'eq', request.params.slug);

		//   if (data) {
		//     return response.json({
		//       total: data[0]?.view_count || null
		//     });
		//   }
		// }
	}

	async function fetchPageStats(slug) {
		const { data, error } = await supabase.from('posts').select('view_count, id').eq('slug', slug)
		if (data) {
			pageViews = data[0]['view_count']
			postID = data[0]['id']
		}
	}

	async function fetchPageRatings(postID) {
		const { data, error } = await supabase
			.from('post_ratings')
			.select('like, dislike')
			.eq('id', postID)

        let sums = data.reduce((totals, obj) => {
            return {
                likes: totals.likes + (obj.like === true ? 1 : 0),
                dislikes: totals.dislikes + (obj.dislike === true ? 1 : 0)
            }  
        }, {likes: 0, dislikes: 0})

        likes = sums.likes
        dislikes = sums.dislikes
        
	}

	async function rating(postID, like, dislike) {
		const payload = {
			id: postID,
			user_id: userID,
			like: like,
			dislike: dislike
		}
		const { data: existingRating } = await supabase
			.from('post_ratings')
			.select('*')
			.eq('user_id', userID)
			.single()

		if (existingRating) {
			// User has already rated this comment, update their rating
			const {error} = await supabase
				.from('post_ratings')
				.update({ like: like, dislike: dislike })
				.eq('id', existingRating.id)
            
                if (error) console.error(error)
		} else {
			// User has not yet rated this comment, insert new rating
			await supabase.from('post_ratings').insert(payload)
		}

        fetchPageRatings(postID)
	}

	onMount(async () => {
		await incrementViews(slug)
		await fetchPageStats(slug)
		await fetchPageRatings(postID)

		currentUserProfile.subscribe((n) => {
			if (n.user_id) {
				username = n.username
				userID = n.user_id
			}
		})
	})
</script>

<div class="flex flex-row items-center gap-2">
	<!-- LIKE -->
	<button
		disabled={!username}
		class="contents rounded disabled:opacity-50"
		on:click={() => rating(postID, true, false)}
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
		<div>{likes}</div>
	</button>

	<div class="h-6 border border-l-white"></div>

	<!-- DISLIKE -->
	<button
		disabled={!username}
		class="contents rounded disabled:opacity-50"
		on:click={() => rating(postID, false, true)}
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
		<div>{dislikes}</div>
	</button>

    <div class="h-6 border border-l-white"></div>

	<div>{pageViews} views</div>
</div>
