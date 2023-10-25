<script lang="ts">
	import { supabase, checkForSession } from '$lib/supabaseClient'

	let isLoggedIn: Boolean = false
	let username: String = ''
	let userData: Object = {}

	async function checkSession() {
		//const { data, error } = await supabase.auth.getSession()
		//if (error?.message) console.error(error)
		const data = await checkForSession()

		console.log('SES:', data)
		if (data.session) {
			isLoggedIn = true

			userData = data.session.user
			username = data.session.user.user_metadata?.username
		}
	}

	checkSession()
</script>

<div>
	<h1>{username}</h1>
	<hr />
	<form class="flex flex-col gap-4">
		<label for="email"
			>Email
			<div id="email">{userData?.email}</div>
		</label>

		<label for="created"
			>Account created
			<div id="created">
				{new Date(userData?.created_at).toLocaleString('en-FI', {
					dateStyle: 'full',
					timeStyle: 'short'
				})}
			</div>
		</label>

		<label for="last-online"
			>Last online
			<div id="last-online">
				{new Date(userData?.last_sign_in_at).toLocaleString('en-FI', {
					dateStyle: 'full',
					timeStyle: 'short'
				})}
			</div>
		</label>

		<!-- <button class="pt-2 pb-2 pl-10 pr-10 self-start bg-emerald-700 rounded">Save</button> -->
	</form>
	<hr />
	<!-- <div>{JSON.stringify(userData)}</div> -->
</div>
