import type { APIContext } from 'astro';
import { supabase } from '$lib/supabaseClient';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

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
  const body = escapeRegExp(String(query.getAll("q")))
  //const query = request.query.q;

  if (body === "null") {
    return new Response(null)
  }
  else {

    // Your search logic here. This could be a database search,
    // a search in your CMS, a call to a third-party search API, etc.
    // This will depend on how your site's data is structured.
    const searchResult = await searchSite(body)

    console.log(searchResult)

    let results = '<h3>Search results:</h3><div';

    if (searchResult.length > 0) {
      // Loop through the data and create a new div for each result
      searchResult.forEach(i => {
        const highlightedTitle = i.title.replace(new RegExp(body, 'gi'), (match) => `<mark>${match}</mark>`);
        const highlightedDescription = i.description.replace(new RegExp(body, 'gi'), (match) => `<mark>${match}</mark>`);

        results += `
        <h2 class=" p-0">
          <a href="${i.slug}">${highlightedTitle}</a>
        </h2>
        <i>${highlightedDescription}</i>
        <hr/>
      `;
      });
    }
    else {
      results += `
        <h2 class=" p-0">
          No matches in titles or descriptions...
        </h2>
        <hr/>
      `;
    }

    //res.status(200).send(results);<div class="border-b border-b-white">
    return new Response(results);
  }
};