import type { APIRoute } from 'astro';
import { supabase } from "$lib/supabaseClient"


// export const POST: APIRoute = async function POST({ cookies, redirect, request }) {
// 	try {
// 		// The code is retrieved from the query parameter - use whichever mechanism is recommended
//         // for your app/framework. This is just an example.
//         let params = (new URL(document.URL)).searchParams;

//         const code = params.get('code')

//         // call the Supabase API to exchange the code for a session
//         await supabase.auth.exchangeCodeForSession(code)

//         // The password page path is retrieved from the query parameter - use whichever mechanism is recommended
//         // for your app/framework. This is just an example.
//         const next = params.get('next')

// 		return new Response(next, { status: 200 });
// 	} catch (error: unknown) {
// 		console.error(error);
// 	}
// };
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const requestUrl = new URL(request.url)
    const authCode = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get('next')
  
    console.log(authCode, request, cookies, redirect)

    if (!authCode) {
      return new Response("No code provided", { status: 400 });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
  
    if (error) {
      return new Response(error.message, { status: 500 });
    }
  
    const { access_token, refresh_token } = data.session;
  
    cookies.set("sb-access-token", access_token, {
      path: "/",
      secure: true,
      httpOnly: true,
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      secure: true,
      httpOnly: true,
    });

    
    return redirect(next)
    //return redirect("/");
  };