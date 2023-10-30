<script lang="ts">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition';
	import Avatar from './Avatar.svelte'
	import type { AuthSession } from '@supabase/supabase-js'
	import { getProfile, setAdmin, checkAdmin, supabase } from '$lib/supabaseClient'

	let session: AuthSession
	let status = { error: '', success: false, isLoading: false }
	let loading = false
	let profileLoaded = false
	let loaded = false
	// let userID: string | null = null
	let username: string | null = null
	let email: string | null = null
	let bio: string | null = null
	let avatarUrl: string | null = null
	let createdAt: string | null = null
	let updatedAt: string | null = null
	let notifVisible = false
	let fading = false;

	onMount(async () => {
		loading = true
		await supabase.auth.getSession().then(({ data }) => {
			session = data.session
		})

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session
		})

		await getProfile(session).then((res) => {
			console.log(res)
			loading = false
			profileLoaded = true
			username = res.username
			email = res.email
			bio = res.bio
			avatarUrl = res.avatar_url
			createdAt = res.created_at
			updatedAt = res.updated_at
		})
	})

	const updateProfile = async () => {
		try {
			loading = true
			const { user } = session

			const updates = {
				id: user.id,
				email: email,
				username: username,
				avatar_url: avatarUrl,
				bio: bio,
				updated_at: new Date().toISOString()
			}

			const { error } = await supabase.from('profiles').upsert(updates)

			if (error) {
				status = {
					error: error.message,
					success: false,
					isLoading: false
				}
				throw error
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
			}
		} finally {
			loading = false
			loaded = true
			notifVisible = true

			setTimeout(() => {
				notifVisible = false
				// fading = true;
				// setTimeout(() => {
				// 	fading = false;
				// 	notifVisible
				// }, 1000)
			}, 4000)
		}
	}
	function handleInput(event) {
		username = username.replace(/[^a-zA-Z0-9-_]/g, "")
	}
</script>

{#if session}
	<!-- <button class="border-2 p-4" on:click={() => checkAdmin(session.user.id)}>Check Admin</button> -->
	<!-- <button class="border-2 p-4" on:click={() => setAdmin(session.user.id)}>Set Admin</button> -->

	<form on:submit|preventDefault={updateProfile} class="flex flex-col gap-2">
		<Avatar bind:url={avatarUrl} size={150} on:upload={updateProfile} />
		<div>Email: {email}</div>

		<div>
			<label for="username">Username</label>
			<input
				id="username"
				type="text"
				class="rounded border-2 border-white bg-transparent pl-2 text-white"
				bind:value={username}
				on:input={handleInput}
				placeholder={session.user.user_metadata?.username}
			/>
		</div>
		<div>
			<label for="bio"
				>Bio
				<textarea
					id="bio"
					class="h-40 w-full rounded border-2 border-white bg-transparent pl-2 text-white"
					bind:value={bio}
					placeholder="This is a description of me..."
				></textarea>
			</label>
		</div>
		<div class="self-end">
			<button type="submit" class="rounded-full bg-violet-800 pl-4 pr-4" disabled={loading}>
				{loading ? 'Saving ...' : 'Update profile'}
			</button>
		</div>
		<i>
			User since: {new Date(createdAt).toLocaleString('en-FI', {
				dateStyle: 'full',
				timeStyle: 'short'
			})}
		</i>
		{#if notifVisible}
			{#if loaded && !status.error}
				<div class="fade rounded bg-emerald-600 p-2">Changes saved successfully!</div>
			{:else if status.error}
				<div class="fade rounded bg-red-700 p-2">Error: {JSON.stringify(status.error)}</div>
			{/if}
		{/if}
	</form>
{:else}
	<h2>Loading...</h2>
{/if}

<style>
    .fade {
        animation: fadeout 1s forwards;
        animation-delay: 3s;
    }

    @keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }
</style>