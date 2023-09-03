<script lang="ts">
	import Modal from '../buildingBlocks/Modal.svelte'
    import {checkForState, checkForSession, supabase} from '$lib/supabaseClient';
    import { fade } from 'svelte/transition'
    import { profile } from "$components/stores/profile"

    // export const $profile = map({
    //     name: 'anonymous'
    // })
    

    export let session;

	let showModal = false

	let status = { error: '', success: false, isLoading: false }
	// let email = 'eriko.oy38@gmail.com'
	// let password = 'kakkapylly2'
    let email = ""
    let password = ""
	let remember = false

	let isLoggedIn = false;
	let loginError = false

	function handleShowModal() {
		showModal = true
	}
	function handleHideModal() {
		showModal = false
	}

	const handleLogin = async () => {
		status = { error: '', success: false, isLoading: true }

		// const { error } = await supabase.auth.signInWithOtp({
		// 	email: email
		// 	// options: {
		// 	//     emailRedirectTo: import.meta.env.PUBLIC_REDIRECT_URL
		// 	// }
		// })
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		})

		// if (error?.message) {
		// 	status = {
		// 		error: error.message,
		// 		success: false,
		// 		isLoading: false
		// 	}
		// } else {
		// 	status = { error: '', success: true, isLoading: false }
		// }

		// console.log(data)

        session = data

		if (data?.session) {
			isLoggedIn = true
			handleHideModal()
		} else {
			loginError = true
		}
	}

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error?.message) console.error(error)

		isLoggedIn = false
	}

	async function createTestUser() {
		const { data, error } = await supabase.auth.signUp({
			email: 'eriko.oy38@gmail.com',
			password: 'kakkapylly2',
			options: {
				data: {
					username: 'Kierukka'
				}
			}
		})

		// console.log(data, error)
	}
</script>

<div class="flex justify-end">
    <!-- <div>Logged in: {isLoggedIn}</div> -->
	<!-- <button on:click={() => createTestUser()}>Create dummy user</button> -->

	{#if isLoggedIn}
		<button
			on:click={() => handleLogout()}
			class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:border-violet-800"
		>
        &#128296 Log out &#128296
		</button>
	{:else}
		<button
			on:click={() => handleShowModal()}
			class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:border-violet-800"
		>
        &#128296 Log in &#128296
		</button>
	{/if}
</div>

<!-- This IF is required to have the transition FX inside Modal work -->
{#if showModal}
<Modal bind:showModal>
    <div
    />
	<div class="flex w-96 flex-col" slot="header">
        <button on:click={() => profile.set({"name": "Ebin"})} class="border-2 hover:border-green-700">Test Nano Store</button>
        <div>{JSON.stringify($profile)}</div>

		<h2 class="mb-2 border-b-2 border-solid border-b-violet-800">Log in</h2>

		<p>Email</p>
		<input bind:value={email} placeholder="placeholder.example@mail.com" class="loginField" />
		<p>Password</p>
		<input bind:value={password} placeholder="*********" class="loginField" type="password" />

		<label>
			<input type="checkbox" bind:checked={remember} />
			Remember me
		</label>

		<button
			disabled={!email && !password}
			on:click={() => handleLogin()}
			class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:border-violet-800"
			>Log in</button
		>

		{#if loginError}
			<div class="rounded border-2 border-solid border-red-700 text-red-700">
				Error encountered while trying to log in
			</div>
		{/if}

        <div>
            <ul class="list-disc [&>li]:ml-10 [&>li]:text-base">Funni issues
                <li>Sign up working, but RLA is disabled (BAD so disabled)</li>
                <li>Log in is working, but session is not saved in cookies (How to get session data from Svelte-component to Astro...)</li>
                <li>Sign out works fine</li>
            </ul>
        </div>
	</div>
</Modal>
{/if}

<style>
	.loginField {
		padding: 5px;
		border: 1px lightslategrey solid;
		border-radius: 5px;
	}
</style>
