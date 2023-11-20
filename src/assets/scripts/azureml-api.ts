import type { APIRoute } from "astro";

export const bicyclePOST: APIRoute = async (data) => {
    // const data = await request.json();

    //console.log("############### DATA", data)
    
    const response = await fetch(data.url, {
        method: 'POST',
        body: JSON.stringify(data.body),
        headers: {
            "Authorization": import.meta.env.AZURE_ML_BICYCLE_PREDICT_KEY,
            "Content-Type": "application/json"
        }
    })
    const resData = await response.json()

	return new Response(
		JSON.stringify(
            resData
			// body: data.body,
			// url: data.url,
			// headers: {
			// 	"Authorization": import.meta.env.AZURE_ML_BICYCLE_PREDICT_KEY,
			// 	"Content-Type": "application/json"
			// }
        ),
        { status: 200 }
	)
}

export const carPOST: APIRoute = async (data) => {
    // const data = await request.json();

    //console.log("############### DATA", data)
    
    const response = await fetch(data.url, {
        method: 'POST',
        body: JSON.stringify(data.body),
        headers: {
            "Authorization": import.meta.env.AZURE_ML_CAR_PREDICT_KEY,
            "Content-Type": "application/json"
        }
    })
    const resData = await response.json()

	return new Response(
		JSON.stringify(
            resData
			// body: data.body,
			// url: data.url,
			// headers: {
			// 	"Authorization": import.meta.env.AZURE_ML_BICYCLE_PREDICT_KEY,
			// 	"Content-Type": "application/json"
			// }
        ),
        { status: 200 }
	)
}