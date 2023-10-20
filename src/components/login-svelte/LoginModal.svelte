<script lang="ts">
	//import Cookies from 'js-cookie';
	import Tabs from '$components/building-blocks/Tabs.svelte'
	import Modal from '../building-blocks/Modal.svelte'
	import { checkForState, supabase } from '$lib/supabaseClient'
	import { fade } from 'svelte/transition'
	import { profile } from '$components/stores/profile'

	// export const $profile = map({
	//     name: 'anonymous'
	// })

	let showModal = false

	let status = { error: '', success: false, isLoading: false }
	let username = ''
	let email = '' //'kire.nenoksuuh@gmail.com'
	let password = '' //'munakoiso47' //kakkapylly2
	// let email = ""
	// let password = ""
	let remember = false

	let isLoggedIn = false
	let loginError = false
	let passwordRecovering = false

	function handleShowModal() {
		showModal = true
	}
	function handleHideModal() {
		showModal = false
	}

	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					username: username
				}
			}
		})
		if (error?.message) {
			status = {
				error: error.message,
				success: false,
				isLoading: false
			}
		} else {
			status = { error: '', success: true, isLoading: false }
		}

		if (data?.session) {
			isLoggedIn = true
			handleHideModal()
		} else {
			loginError = true
		}
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

		if (error?.message) {
			status = {
				error: error.message,
				success: false,
				isLoading: false
			}
		} else {
			status = { error: '', success: true, isLoading: false }
		}

		if (data?.session) {
			isLoggedIn = true
			username = data.session.user.user_metadata?.username

			// fetch(`${window.location.origin}/api/login?session_token=${data?.session?.access_token}`, {
			// 	method: 'POST',
			// });

			// let event = new CustomEvent('session_token', {
			// 	detail: {
			// 		sessionCookie: data?.session?.access_token
			// 	}
			// });
			// dispatchEvent(event);

			// Cookies.set('session_token', data.session.access_token, {
			// 	path: '/',
			// 	httpOnly: true,
			// 	maxAge: data.session.expires_in
			// })

			handleHideModal()
		} else {
			loginError = true
		}
	}

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error?.message) console.error(error)

		//Cookies.remove('session_token');
		isLoggedIn = false
		username = null
	}

	async function handlePasswordReset() {
		passwordRecovering = true
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/api/auth/callback?next=/account/update-password`
		})
		console.log(data)
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
	}
	//const session = Cookies.get('session_token');
	// async function checkSession() {
	// 	return await checkForSession()
	// }
	async function checkSession() {
		const { data, error } = await supabase.auth.getSession()
		if (error?.message) console.error(error)
		if (data.session) {
			isLoggedIn = true

			username = data.session.user.user_metadata?.username
		}
	}

	function handleKeydown(event) {
		// prevent that a space is typed
		if (event.code === 'Space') event.preventDefault()
	}
	function handleInput(event) {
		// remove spaces from pasted text
		username = username.replaceAll(' ', '')
	}

	checkSession()

	//export let session;
	let tabItems = [
		{ label: 'Log in', value: 1 },
		{ label: 'Sign up', value: 2 }
	]

	// Current active tab
	let currentTab
</script>

<div class="flex flex-row justify-between">
	{#if isLoggedIn}
		<div class="m-2 pb-2 pl-5 pr-5 pt-2">
			<details class="user-options">
				<summary><strong>{username}</strong></summary>
				<a href="/profile">Profile</a>
			</details>
		</div>
	{:else}
		<div class="m-2 pb-2 pl-5 pr-5 pt-2"></div>
	{/if}

	<div class="right-6">
		<!-- <div>Logged in: {isLoggedIn}</div> -->
		<!-- <button on:click={() => createTestUser()}>Create dummy user</button> -->

		{#if isLoggedIn}
			<button
				on:click={() => handleLogout()}
				class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:bg-violet-800 hover:text-white"
			>
				Log out
			</button>
		{:else}
			<button
				on:click={() => handleShowModal()}
				class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:bg-violet-800 hover:text-white"
			>
				Log in
			</button>
		{/if}
	</div>
</div>

<!-- This IF is required to have the transition FX inside Modal work -->
{#if showModal}
	<Modal bind:showModal>
		<div class="flex w-96 flex-col gap-4" slot="header">
			<Tabs bind:activeTabValue={currentTab} items={tabItems} />
			<!-- <button on:click={() => profile.set({"name": "Ebin"})} class="border-2 hover:border-green-700">Test Nano Store</button> -->
			<!-- <div>{JSON.stringify($profile)}</div> -->

			{#if 1 === currentTab}
				<!-- <h2 class="mb-2 border-b-2 border-solid border-b-violet-800">Log in</h2> -->

				<div>Email</div>
				<input
					bind:value={email}
					placeholder="placeholder.example@mail.com"
					class="loginField"
					required
				/>
				<div>Password</div>
				<input
					bind:value={password}
					placeholder="*********"
					class="loginField"
					type="password"
					required
				/>

				<!-- <label>
					<input type="checkbox" bind:checked={remember} />
					Remember me
				</label> -->
				<!-- {#if passwordRecovering}
					<div>Check your email for recovery instruction!</div>
				{:else}
					<button class="text-blue-800 hover:underline" on:click={() => handlePasswordReset()}
						>Forgot your password?</button
					>
				{/if} -->

				<button
					disabled={!email && !password}
					on:click={() => handleLogin()}
					class="m-2 rounded-lg border-2 border-transparent bg-violet-800 pb-2 pl-5 pr-5 pt-2 text-white transition hover:border-violet-800 hover:bg-violet-400 hover:text-black"
					>Log in</button
				>
			{/if}

			{#if 2 === currentTab}
				<!-- <h2 class="mb-2 border-b-2 border-solid border-b-violet-800">Sign up</h2> -->

				<div>Username (No spaces)</div>
				<input
					bind:value={username}
					on:keydown={handleKeydown}
					on:input={handleInput}
					placeholder="UserName1234"
					class="loginField"
					required
				/>
				<div>Email</div>
				<input
					bind:value={email}
					placeholder="placeholder.example@mail.com"
					class="loginField"
					required
				/>
				<div>Password</div>
				<input
					bind:value={password}
					placeholder="*********"
					class="loginField"
					type="password"
					required
				/>

				<button
					disabled={!username && !email && !password}
					on:click={() => handleSignUp()}
					class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:border-violet-800"
					>Sign up</button
				>
			{/if}

			{#if loginError}
				<div class="rounded text-red-700">
					Error encountered while trying to log in:
					<p>{JSON.stringify(status.error)}</p>
				</div>
			{/if}

			<!-- <div>
				<ul class="list-disc [&>li]:ml-10 [&>li]:text-base">
					Funni issues
					<li>Sign up working, but RLA is disabled (BAD so disabled)</li>
					<li>
						Log in is working, but session is not saved in cookies (How to get session data from
						Svelte-component to Astro...)
					</li>
					<li>Sign out works fine</li>
				</ul>
			</div> 
			<div>
				<p>{JSON.stringify(status)}</p>
			</div>
			-->
		</div>
	</Modal>
{/if}

<style>
	.loginField {
		padding: 5px;
		border: 1px lightslategrey solid;
		border-radius: 5px;
	}

	.user-options {
		display: flex; 
		border-radius: 10px;
		padding: 0px 10px 0px 30px !important;
		position: relative;
		/* max-width: 20rem; */
	}
	.user-options:hover {
		background: rgba(0, 0, 0, 0.15);
		padding: 6px;
		width: 15em;
		border: none;
		box-shadow: 3px 3px 4px black;
		cursor: pointer;
	}
	.user-options[open] {
		position: absolute;
		background: rgb(14, 2, 46);
		padding: 0px 10px 0px 30px !important;
		width: 15em;
		border: none;
		box-shadow: 3px 3px 4px black;
		cursor: pointer;
	}
	.user-options > a {
		text-decoration-line: none;
		padding-left: 30px;
		border: 2px solid transparent;
		padding: 10px;
		margin: 5px;
		transition: all ease-in-out 0.2s;
	}
	.user-options > a::before {
		content: "❯ ";
	}
	.user-options > a:hover {
		background: rgb(75, 2, 243);
		border-radius: 10px;
	}

	.user-options summary::-webkit-details-marker,
	.user-options summary::marker {
		display: none; 
		content: "";
	}

	/* .user-options::marker {
		content: none;
	} */
</style>
