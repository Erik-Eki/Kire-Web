import { createClient } from '@supabase/supabase-js'
import cookie from "cookie"
import type { Database } from '../types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)



// export async function getUser(req: Request) {
//     const c = cookie.parse(req.headers.get('cookie') ?? "");
//     if (!c.sbat) {
//         return null
//     }

//     const { data: { user } } = await supabase.auth.getUser(c.sbat);
//     if (!user || user.role !== "authenticated") {
//         return null
//     }
//     return user
// }

// export async function isLoggedIn(req: Request) {
//     return await getUser(req) != null
// }
//Saving the auth session cookies in Astro is a way to persist the user’s authentication state across different pages and requests. You can use the Astro setCookie and getCookie methods to set and get cookies in your Astro components and API routes. Here is an example of how you can use these methods:
export async function downloadImage(path: string) {
    if (path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)

            if (error) {
                throw error
            }

            const url = URL.createObjectURL(data)
            return url
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }
    else {
        return null
    }
}


export async function getProfile(session) {
    try {
        const { user } = session

        const { data, error, status } = await supabase
            .from('profiles')
            .select('username, email, bio, avatar_url, created_at, updated_at')
            .eq('id', user.id)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            return data
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
    }
}

export async function fetchUserDetails() {
    return supabase.auth.getUser()
}

export async function checkForState(req: Request) {
    const c = cookie.parse(req.headers.get('cookie') ?? "");
    // console.log("REQ", c)
    const { event, session } = await supabase.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
        if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
        if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session)

        console.log("AUTH CHANGE:", event, session)
    })

    return { event, session }
}

export async function checkForSession() {
    const { data, error } = await supabase.auth.getSession()
    // console.log("AUTH SESSION:", data, error)

    return data
}