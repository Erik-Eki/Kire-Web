import type { APIContext } from 'astro';
import { supabase } from '$lib/supabaseClient';

async function searchSite(query) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    // .textSearch('title', query);

  if (error) throw error;

  return data;
}

export async function GET({ params, request }: APIContext) {
//export default async (req, res) => {
    const query = new URL(request.url).searchParams
    const body = query.getAll("q")
    //const query = request.query.q;
  
    // Your search logic here. This could be a database search,
    // a search in your CMS, a call to a third-party search API, etc.
    // This will depend on how your site's data is structured.
    const searchResult = await searchSite(body)

    let results = '<h3>Search results:</h3><div class="border-b border-b-white">';
    // Loop through the data and create a new div for each result
    searchResult.forEach(i => {
      results += `
        <h2 class=" p-0">
          <a href="${i.slug}">${i.title}</a>
        </h2>
        <i>${i.description}</i>
        <div class="border-b border-b-white">
      `;
    });


    // const results = {
    //   //title: `ebin search results for: ${body}`,
    //   //search: html
    // }//searchSite(query);
  
    //res.status(200).send(results);
    return new Response(results);
  };