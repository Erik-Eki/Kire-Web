<script setup>
import { ref, reactive } from 'vue'

const todos = ref(["Commit arson in Fallujah."])
const newTask = ref("")
// const counter = reactive({ count: 0 })
const counter = ref(0)
// const belowZero = ref(false)

const buttonClass = ref("bt")

const text = ref("")


function addTask(task) {
    if (task) {
        todos.value.push(task)
        newTask.value = ""
    } else {alert("Type at least something first...")}
    
}
function removeTask(taskIndex) {
    todos.value.splice(taskIndex, 1)
    // todos = [...todos.splice(taskIndex, 1)]
}

function increment() {
    counter.value++
}
function decrement() {
    counter.value--
}
</script>

<template>
    <button
		onclick="javascript: history.back()"
		class="rounded p-3 text-4xl duration-200 ease-in-out hover:bg-violet-950"
	>
		<i class="fa-solid fa-arrow-left text-4xl"></i> Back
    </button>
    <div class="grid gap-y-14">
        <div>
            <p>Ebin TODO List</p>
                <ul class="grid gap-y-4 mb-3 mt-3 p-2 rounded bg-slate-800 shadow-slate-950 shadow-md">

                    <li v-for="(task, index) in todos" class="flex flex-row">
                        <button @click="removeTask(index)" class="mr-5 p-1 w-9 h-9 leading-3 text-emerald-600 font-extrabold border-2 border-emerald-600 rounded">X</button>
                        <p class="self-end">{{index}}. {{ task }}</p>
                    </li>

                </ul>
            <input v-model="text" placeholder="Type a task" class="bg-transparent text-white border-2 rounded p-2">
            <button @click="addTask(text)" class="p-2.5 m-1 rounded bg-emerald-600">Add</button>
        </div>


        <div>
            <p>Ebin counter</p>
            <h2>
                Clicked: {{ counter }}
                <p v-if="counter === 1">time</p>
                <p v-else>times</p>
            </h2>
            <div class="flex flex-row">
                <button v-if="counter === 0" disabled class="disabled">-</button>
                <button v-else v-on:click="decrement" :class="buttonClass">-</button>
                <!-- This @-listener does the same thing -->
                <button @click="increment" :class="buttonClass">+</button>
            </div>
        </div>
    </div>
</template>

<style>
.bt {
    background-color: seagreen;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 50px;
    height: 50px;
}
.disabled {
    background-color: slategray;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 50px;
    height: 50px;
}
</style>