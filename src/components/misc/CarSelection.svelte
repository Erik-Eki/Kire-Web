<script>
	// import { bicyclePOST, carPOST } from "$scripts/azureml-api"
	// import bikeTest from "$assets/bike.json"
	// import carTest from '$assets/car.json'
    import { carPOST } from "$scripts/azureml-api"

    export let carTestData

    const carEndpoint = 'http://2a92d5ed-23e5-4ade-abf5-9d188ef4a1cd.northeurope.azurecontainer.io/score'

	// const bikeEndpoint =
	// 'http://42cee8a1-d308-4e59-a387-2a14cf9dea27.northeurope.azurecontainer.io/score'
	// // const electricityEndpoint: String = 'http://af6fe771-ed99-44fc-b290-e0ea2f2dc0d8.northeurope.azurecontainer.io/score'
	// const carEndpoint =
	//     'http://2a92d5ed-23e5-4ade-abf5-9d188ef4a1cd.northeurope.azurecontainer.io/score'

	// let bicycleRes = bicyclePOST({ url: bikeEndpoint, body: bikeTest })
	// const bicycleData = bicycleRes.json()
	// let carRes = carPOST({ url: carEndpoint, body: carTest })
	// const carData = carRes.json()

	// console.log(bikeTest)

	function handleClick(e) {
		const formData = new FormData(e.target)

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        //console.log(data)

        carTestData = {Inputs: {WebServiceInput0: [data]}}

        let carRes = carPOST({ url: carEndpoint, body: carTestData })
        const carData = carRes.json()
		//console.log('ebin', carData)
	}
</script>

<div>
	<form on:submit|preventDefault={handleClick}>
		<ul class="flex flex-col gap-2">
			{#each Object.entries(carTestData.Inputs.WebServiceInput0[0]) as [key, value]}
				<li class="flex w-full">
					<label for={key}>{key}</label>
					<input
						class="ml-4 bg-slate-800 pl-3"
						type="text"
						id={key}
						name={key}
						placeholder={value}
						value={value}
					/>
				</li>
			{/each}
			<li class="submit-button rounded border-2 border-violet-800 p-2">
				<button type="submit">Get prediction</button>
			</li>
		</ul>
	</form>
</div>

<!-- <div
    class="flex w-full flex-col rounded-lg border-2 border-solid border-violet-800 bg-black bg-opacity-40 p-2"
>
    <h1 class="text-center text-white">Azure Machine Learning Test</h1>
    <h1>Car price prediction</h1>
    <h2>Parameters:</h2>
    <div class="fancy-scrollbar overflow-auto flex flex-col whitespace-nowrap">
        {#each carTest.Inputs.WebServiceInput0 as car, index}
            <code class="m-2">{index}. {JSON.stringify(car)}</code>
        {/each}
        </div>
    <h2>Predicted car price:</h2>
    <div>
        {#await carData}
            {#if carData.Results}
                {#each carData.Results.WebServiceOutput0 as pred, index}
                    <div class="m-2">{index}. ${pred?.predicted_price.toFixed(2)}</div>
                {/each}
            {:else}
                <div>Loading...</div>
            {/if}
        {/await}
    </div>

    <hr class="mt-5">
    <h1>Bike rental price prediction</h1>
    <h2>Parameters:</h2>
    <code class="fancy-scrollbar overflow-auto">
        {JSON.stringify(bikeTest)}
    </code>
    <h2>Predicted bicycle rent:</h2>
    <div>
        {#await bicycleData}
            ${Number(bicycleData?.Results).toFixed(2)}
        {/await}
    </div>
</div> -->

<style>
	/* .data-input::placeholder {
        color: gray;
        padding-left: 10px;
    } */
</style>
