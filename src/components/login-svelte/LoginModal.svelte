<script lang="ts">
	import { cookie } from 'cookie'
	//import Cookies from 'js-cookie';
	import Tabs from '$components/building-blocks/Tabs.svelte'
	import Modal from '../building-blocks/Modal.svelte'
	import Search from '$components/main/Search.svelte'
	import { downloadImage, getProfile, supabase } from '$lib/supabaseClient'
	//import { fade } from 'svelte/transition'
	//import { profile } from '$components/stores/profile'
	import type { AuthSession } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	//import { createStore } from 'nano-store';
	import { currentUserProfile } from '$components/stores/profile'
	

	let session: AuthSession

	let showModal = false

	let status = { error: '', success: false, isLoading: false }
	let username = ''
	let email = '' //'kire.nenoksuuh@gmail.com'
	let password = '' //'munakoiso47' //kakkapylly2
	let passwordValid = false
	let remember = false
	let avatarName
	let avatarUrl
	let admin

	let loginError = false
	let passwordRecovering = false

	$: if (password.length > 6) passwordValid = true

	onMount(async () => {
		// supabase.auth.getSession().then(({ data }) => {
		// 	session = data.session
		// 	username = data.session.user.user_metadata?.username
		// })

		// supabase.auth.onAuthStateChange((_event, _session) => {
		// 	session = _session
		// 	//isLoggedIn = true
		// 	//username = session.user.user_metadata?.username
		// })
		await supabase.auth.getSession().then(({ data }) => {
			session = data.session
		})

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session
		})

		await getProfile(session).then((res) => {
			if (res) {
				avatarName = res.avatar_url
				username = res.username
				admin = res.admin

				currentUserProfile.set({ username: username, user_id: session.user.id, admin: admin })
			}
		})

		if (avatarName) avatarUrl = await downloadImage(avatarName)
	})
	// export const $profile = map({
	//     name: 'anonymous'
	// })

	function handleShowModal() {
		showModal = true
		passwordRecovering = false
	}
	function handleHideModal() {
		showModal = false
		passwordRecovering = false
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
			handleHideModal()
		} else {
			loginError = true
		}
	}

	const handleLogin = async () => {
		status = { error: '', success: false, isLoading: true }

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		})

		if (error) {
			status = {
				error: error.message,
				success: false,
				isLoading: false
			}
		} else {
			status = { error: '', success: true, isLoading: false }
		}

		if (data?.session) {
			//isLoggedIn = true
			username = data.session.user.user_metadata?.username
			//email = data.session.user.email

			await getProfile(session).then((res) => {
				avatarName = res.avatar_url
				username = res.username
				admin = res.admin

				currentUserProfile.set({ username: username, user_id: session.user.id, admin: admin })
			})

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

	const handleLoginGithub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${window.location.origin}/api/auth/callback`
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
		handleHideModal()
	}

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error?.message) console.error(error)

		currentUserProfile.set({ username: null, user_id: null, admin: false })
		username = null
	}

	async function handlePasswordReset() {
		passwordRecovering = true

		// supabase.auth.onAuthStateChange((event, session) => {
		// 	if (event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') {
		// 		const expires = new Date(0).toUTCString()
		// 		document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
		// 	}
		// })

		//http://172.20.176.1:4321/api/auth/callback
		// kire.nenoksuuh@gmail.com
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/api/auth/callback?next=/account/update-password`
		})
		if (error) console.error(error)
		// supabase.auth.onAuthStateChange(async (event, session) => {
		// 	console.log(event, session)
		// 	if (event == 'PASSWORD_RECOVERY') {
		// 		const newPassword = prompt('What would you like your new password to be?')
		// 		const { data, error } = await supabase.auth.updateUser({ password: newPassword })

		// 		if (data) alert('Password updated successfully!')
		// 		if (error) alert('There was an error updating your password.')
		// 	}
		// })
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

	function handleKeydown(event) {
		// prevent that a space is typed
		if (event.code === 'Space') event.preventDefault()
	}
	function handleInput(event) {
		// remove spaces from pasted text
		//username = username.replaceAll(' ', '')
		///^[a-z0-9_\.]+$/
		username = username.replace(/[^a-zA-Z0-9-_]/g, "")
		//username = username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	}

	//checkSession()

	//export let session;
	let tabItems = [
		{ label: 'Log in', value: 1 },
		{ label: 'Sign up', value: 2 }
	]

	// Current active tab
	let currentTab
</script>

<div class="justify-between parent-box">
	{#if session}
		<div class="pb-2 pl-5 pr-5 pt-2">
			<details class="user-options">
				<summary>
					<div class="cover">
						{#if avatarUrl}
							<img src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} />
						{:else}
							<svg
								class="bg-gray-600"
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								{...$$props}
								><path
									fill="currentColor"
									d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
								/></svg
							>
						{/if}
						<strong>{username}</strong>
					</div>
				</summary>
				<a href="/account/profile">Profile</a>

				<button
					on:click={() => handleLogout()}
					class="min-w-full m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:bg-red-800 hover:text-white"
				>
					Log out
				</button>
			</details>
		</div>
	{:else}
		<!-- <div class="m-2 pb-2 pl-5 pr-5 pt-2"></div> -->
		<button
			on:click={() => handleShowModal()}
			class="m-2 rounded-lg border-2 border-transparent pb-2 pl-5 pr-5 pt-2 transition hover:bg-violet-800 hover:text-white"
		>
			Log in
		</button>
	{/if}

	<Search/>

	<!-- <div class="right-6">
	</div> -->
</div>

<!-- This IF is required to have the transition FX inside Modal work -->
{#if showModal}
	<Modal bind:showModal>
		<div class="flex w-96 flex-col gap-4" slot="header">
			<Tabs bind:activeTabValue={currentTab} items={tabItems} />
			<!-- <button on:click={() => profile.set({"name": "Ebin"})} class="border-2 hover:border-green-700">Test Nano Store</button> -->
			<!-- <div>{JSON.stringify($profile)}</div> -->

			{#if 1 === currentTab}
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
						>Forgot your password? (Type in email above, the click here)</button
					>
				{/if} -->

				<button
					disabled={!email && !password}
					on:click={() => handleLogin()}
					on:keyup={(e) => e.key === 'Enter' && handleLogin()}
					class="m-2 rounded-lg border-2 border-transparent bg-violet-800 pb-2 pl-5 pr-5 pt-2 text-white transition hover:border-violet-800 hover:bg-violet-400 hover:text-black"
					>Log in</button
				>

				<!-- <button
					on:click={() => handleLoginGithub()}
					class="m-2 flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-500 p-2 text-white"
				>
					Sign in with Github
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						{...$$props}
						><path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
						/></svg
					>
				</button> -->
			{/if}

			{#if 2 === currentTab}
				<div>Username (No spaces)</div>
				<input
					bind:value={username}
					on:keydown={handleKeydown}
					on:input={handleInput}
					placeholder="User-Name_1234"
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
					placeholder="********* (at least 6 characters)"
					class="loginField"
					type="password"
					required
				/>

				<button
					disabled={(!username && !email && !password) || !passwordValid}
					on:click={() => handleSignUp()}
					on:keyup={(e) => e.key === 'Enter' && handleSignUp()}
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
		</div>
	</Modal>
{/if}

<style>
	.parent-box {
		display: flex;
		flex-direction: row;
	}
	@media only screen and (max-width: 695px){
		.parent-box {
			flex-direction: column;
		}
	}
	.cover {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
	.cover img,
	svg {
		margin: 0;
		width: 3rem !important;
		height: 3rem !important;
		border-radius: 100%;
		object-fit: cover;
		overflow: hidden;
		border: 1px solid white;
	}
	.loginField {
		padding: 5px;
		border: 1px lightslategrey solid;
		border-radius: 5px;
	}

	.user-options {
		display: flex;
		border-radius: 10px;
		padding: 5px 30px 0px 10px !important;
		position: relative;
		/* max-width: 20rem; */
	}
	.user-options:hover {
		background: rgba(0, 0, 0, 0.15);
		/* padding: 6px; */
		/* width: 15em; */
		border: none;
		box-shadow: 3px 3px 4px black;
		cursor: pointer;
	}
	.user-options[open] {
		position: absolute;
		background: rgb(14, 2, 46);
		padding: 5px 30px 0px 10px !important;
		/* width: 15em; */
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
		content: '❯ ';
	}
	.user-options > a:hover {
		background: rgb(75, 2, 243);
		border-radius: 10px;
	}

	.user-options summary::-webkit-details-marker,
	.user-options summary::marker {
		display: none;
		content: '';
	}
	/* .user-options::marker {
		content: none;
	} */
</style>
