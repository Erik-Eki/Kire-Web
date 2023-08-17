<script lang="ts">
	import { contentfulClient } from '../lib/contentful'
	import type { ContentComic } from '../lib/contentful'

	async function getContent() {
		const entriesComics = await contentfulClient.getEntries<ContentComic>({
			content_type: 'contentComic'
		})

		const contentPosts = entriesComics.items.map((item) => {
			const { title, content } = item.fields
			return {
				title,
				content
			}
		})

		return contentPosts
	}

	let promise = getContent()
</script>

<h1 class=" text-white">Astro Comics</h1>
<ul>
	{#await promise}
		<p>...waiting</p>
	{:then posts}
		{#each posts as i}
			<li>
				<a href={`/posts/${i.title}/`}>
					<h2>{i.title}</h2>
					<img src={i.content[0].fields.file.url} alt="Picture contains {i.title}" />
				</a>
			</li>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</ul>
