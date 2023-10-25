// export default (request, response) => {
// 	response.send({
// 		data: `hello ${request.query.name || 'world'}`
// 	})
// }
// import type { APIRoute } from 'astro';

// export const GET: APIRoute = async ({ params, request }) => {
//     params.send({
//         		data: `hello ${request.query.name || 'world'}`
//         	})
// }
//   JSON.stringify({
//     name: 'Astro',
//     url: 'https://astro.build/'
//   })

import type { APIContext } from 'astro';

export function GET({ params, request }: APIContext) {
    //console.log("=====>",request)
    console.log("###########",new URL(request.url).searchParams)

    const paramStr = new URL(request.url).searchParams
    //const searchParams = new URLSearchParams(paramStr);
    const body = paramStr.getAll("name")
    return new Response(JSON.stringify({
        data: `hello ${body || 'world'}`
    }));
}


// export async function GET({params, request}) {
//     console.log("=====>",request)
//     console.log(request.url.searchParams)
//     return new Response(JSON.stringify({
//         //path: new URL(request.url).pathname
//         data: `hello ${request.url || 'world'}`
//       })
//     )
//   }