import type { APIRoute } from 'astro';

export const POST: APIRoute = async function POST({ cookies, redirect, request }) {
	try {
		const { url: requestUrl } = request;
		const { searchParams } = new URL(requestUrl);
		const sessionToken = searchParams.get('session_token');

		cookies.set('session_token', sessionToken, { path:'/'});

		return new Response('', { status: 200 });
	} catch (error: unknown) {
		console.error(error);
	}
};