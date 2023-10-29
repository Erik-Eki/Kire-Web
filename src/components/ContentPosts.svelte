<script lang="ts">
	import { contentfulClient } from '../lib/contentful'
	import type { ContentPost } from '../lib/contentful'
    import { onMount } from 'svelte';

    let contentPosts = []

	onMount(async () => {
		const entries = await contentfulClient.getEntries<ContentPost>({
			content_type: 'contentPost'
		})

		contentPosts = entries.items.map((item) => {
			const { title, date, description, slug } = item.fields
			return {
				title,
				slug,
				description,
				date: new Date(date).toLocaleDateString()
			}
		})
	})

	
</script>

<button class=" outline-rose-800 outline rounded hover:from-fuchsia-500" on:click={handleClick}> Get posts </button>

<h1 class=" text-white">Astro posts</h1>
<ul>
    <p>{contentPosts}</p>
    {#each contentPosts as i}
        <li>
            <a href={`/posts/${i.slug}/`}>
                <h2>{i.title}</h2>
            </a>
            <time>{i.date}</time>
            <p>{i.description}</p>
        </li>
    {/each}
</ul>
