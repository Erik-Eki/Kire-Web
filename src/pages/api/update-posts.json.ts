import { supabase } from "$lib/supabaseClient";
import { useStoryblokApi } from '@storyblok/astro'
//import { createClient } from '@storyblok/client'
import type { APIContext } from 'astro';

const storyblokApi = useStoryblokApi()

async function getPosts() {
    try {
        const { data } = await storyblokApi.get("cdn/stories/", {
            version: 'published'
        })

        return data.stories.map((story) => {
            console.log(story.content.title)
            if (story.content.title) {
                return ({
                    id: story.content._uid,
                    title: story.content.title,
                    description: story.content.description,
                    slug: "/" + story.name,
                    //content: story.content.content.content,
                    created_at: story.first_published_at,
                    updated_at: story.created_at
                })
            }
        }).filter(story => story)
    } catch (error) {
        console.error(error)
        //return Astro.redirect('/404')
    }
}


async function insertPost(post) {
    try {
        //console.log("POSTS: ", post)
        const { data, error } = await supabase.from('posts').upsert(post, { onConflict: 'slug' }).select()

        if (error) {
            throw error
        }

        console.log("====>", data)
        return data
    } catch (error) {
        console.error(error)
        //return Astro.redirect('/404')
    }
}


export async function GET({ params, request }: APIContext) {
    const data = await getPosts()
    const body = await insertPost(data)

    return new Response(JSON.stringify(
        body
    ));
}
// insertPost(dataObj)