import { createClient } from '@supabase/supabase-js'
import cookie from "cookie"
import type { Database } from '../types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(supabaseUrl,supabaseAnonKey)



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

export async function fetchUserDetails() {
    return supabase.auth.getUser()
}

export async function checkForState(req: Request) {
    const c = cookie.parse(req.headers.get('cookie') ?? "");
    // console.log("REQ", c)
    const { event, session } = await supabase.auth.onAuthStateChange((event, session) => {
        //   if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
        //   if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
        //   if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session)
    
        // console.log("AUTH CHANGE:", event, session)
    })

    return {event, session}
}

export async function checkForSession() {
    const { data, error } = await supabase.auth.getSession()
    // console.log("AUTH SESSION:", data, error)

    return data
}