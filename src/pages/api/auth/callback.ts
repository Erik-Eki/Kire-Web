import type { APIRoute } from 'astro';
import { supabase } from "$lib/supabaseClient"


export const POST: APIRoute = async function POST({ cookies, redirect, request }) {
	try {
		// The code is retrieved from the query parameter - use whichever mechanism is recommended
        // for your app/framework. This is just an example.
        let params = (new URL(document.URL)).searchParams;

        const code = params.get('code')

        // call the Supabase API to exchange the code for a session
        await supabase.auth.exchangeCodeForSession(code)

        // The password page path is retrieved from the query parameter - use whichever mechanism is recommended
        // for your app/framework. This is just an example.
        const next = params.get('next')

		return new Response(next, { status: 200 });
	} catch (error: unknown) {
		console.error(error);
	}
};