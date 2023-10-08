<script lang="ts">
	import { getEntries } from 'astro:content'

	export let horoscopeData

	type State = 'start' | 'playing' | 'pause' | 'won' | 'lost'

	let state: State = 'start'

	let userAnswer

	const allSigns: Object = {
		aries: { en: 'Aries', fi: 'Oinas' },
		aquarius: { en: 'Aquarius', fi: 'Vesimies' },
		capricorn: { en: 'Capricorn', fi: 'Kauris' },
		taurus: { en: 'Taurus', fi: 'Härkä' },
		gemini: { en: 'Gemini', fi: 'Kaksoset' },
		cancer: { en: 'Cancer', fi: 'Rapu' },
		leo: { en: 'Leo', fi: 'Leijona' },
		pisces: { en: 'Pisces', fi: 'Kalat' },
		virgo: { en: 'Virgo', fi: 'Neitsyt' },
		libra: { en: 'Libra', fi: 'Vaaka' },
		scorpio: { en: 'Scorpio', fi: 'Skorpioni' },
		sagittarius: { en: 'Sagittarius', fi: 'Jousimies' }
	}

	function checkAnswer(e, correct) {
		const formData = new FormData(e.target)
		const data = {}
		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}
		userAnswer = data.horoscope

        //horoscopeData[userAnswer]
        const index = horoscopeData.findIndex(function(h) {
            return h.name == correct
        });
        
        horoscopeData[index].answered = true
        horoscopeData[index].answer = userAnswer

		console.log(data, correct, index)
	}

	const language: Object = { en: 'English', fi: 'Finnish' }
	let selectedLanguage: String = 'en'

	$: selectedLanguage

    let disableSubmitButton: Boolean = true;


    let currScrollPosition: Number = 0;
    let counter: Number = 1

    function traverseQuestions(direction) {
        // userAnswer = undefined;

        const box = document.getElementById("quiz-box")
        const post = box.offsetLeft
        const width = box.offsetWidth + 16 // <= This is gap-4 (1rem)

        if (direction) {
            if (counter !== 12) {
                currScrollPosition += width
                counter+=1
            }
        }
        else {
            if (counter !== 1) {
                currScrollPosition -= width
                counter-=1
            } 
        }

        box.scroll({left: currScrollPosition, behaviour: "smooth"})

    }
</script>

<div class="flex flex-col gap-2">
	<!-- <div class="rounded border-2 border-violet-900">Change language: {language}</div> -->
	<label for="sign-language-select">Change sign translation:</label>
	<select bind:value={selectedLanguage} id="sign-language-select" class="bg-black text-white">
		{#each Object.entries(language) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>

	<div id="quiz-box" class="flex flex-row gap-4 overflow-x-hidden">
		{#each horoscopeData as horoscopes, index}
			<div class="flex flex-col min-w-fit">
				<div class="flex flex-col rounded bg-slate-800 bg-gradient-to-t p-4 shadow-md">
					<label for={horoscopes.id} class="text-lg font-bold">
						Horoscope #{index+1}:
						{#if horoscopes.answered}
                            <b>{allSigns[horoscopes.title.toLowerCase()][selectedLanguage]}</b>
                        {/if}

					</label>
					<i id={horoscopes.id}>{horoscopes.description}</i>
				</div>

				<form class="mt-4" on:submit|preventDefault={e => checkAnswer(e, horoscopes.name)}>
                <!-- <form class="mt-4"> -->
					<fieldset class="sign-selection">
						<legend>Does this apply to your sign?</legend>
						{#each Object.entries(allSigns) as [sign, names]}
							<label>
								<input 
                                type="radio" 
                                id="{sign}_select" 
                                name="horoscope" 
                                value={sign} 
                                on:change={ () => disableSubmitButton = false }
                                />
								{names[selectedLanguage]}
							</label><br />
						{/each}
						<div>
							<button 
                                type="submit"
                                disabled={disableSubmitButton} 
                                class="mt-2 rounded bg-violet-900 p-4 disabled:bg-slate-500">
                                Submit answer
                            </button>
						</div>
					</fieldset>
				</form>

				<!-- {#if userAnswer} -->
                {#if horoscopes.answered}
					{#if horoscopes.answer === horoscopes.title.toLowerCase()}
						<div class="mt-2 rounded bg-green-900 p-4">
							Correct! This horoschope is indeed for {allSigns[horoscopes.title.toLowerCase()][
								selectedLanguage
							]}! You know yourself well!
						</div>
					{:else}
						<div class="mt-2 rounded bg-red-950 p-4">
							Nope! You didn't get it right. This horoschope is not for 
                            {allSigns[horoscopes.answer][selectedLanguage]} but 
                            <b>{allSigns[horoscopes.title.toLowerCase()][selectedLanguage]}</b>.
                            
						</div>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
    <div class="flex flex-row gap-4">
        <button disabled={counter === 1} class="bg-violet-800 p-2 rounded disabled:bg-slate-500" on:click={() => traverseQuestions(false)}>Previous</button>
        <button disabled={counter === 12} class="bg-violet-800 p-2 rounded disabled:bg-slate-500" on:click={() => traverseQuestions(true)}>Next</button>
        <div>{counter}/{12}</div>
    </div>
</div>

<style>
	/* .sign-selection label {
        padding: 10px;
        border: 2px solid transparent;
        border-radius: 5px;
        transition: 0.2s all ease-in-out;
    }
    .sign-selection label:hover {
        border: 2px solid rgb(126, 71, 255);
    } */

	input {
		appearance: none;

		border-radius: 50%;
		width: 16px;
		height: 16px;

		border: 2px solid #999;
		transition: 0.2s all linear;
		margin-right: 5px;

		/* position: relative; */
		/* top: 4px; */
	}
	input:checked {
		border: 6px solid rgb(126, 71, 255);
	}
</style>
