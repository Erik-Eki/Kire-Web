import { useState, useEffect } from 'preact/hooks'


const wait = ms => new Promise(r => setTimeout(r, ms))

const getTodos = async () => {
  await wait(500);
  return [
    { id: 1, text: 'learn Preact', done: false },
    { id: 2, text: 'make an awesome app', done: false },
  ]
}

export default function PreactDemo() {
  const [count, setCount] = useState(0)
  const [newTask, setNewTask] = useState("")
  const [todos, setTodos] = useState(["Commit vehicular hamburger helper in Conneticut"])

  // useEffect(() => {
  //   getTodos().then(todos => {
  //     setTodos(todos)
  //   })
  // }, [])

  function addTask(task: String) {
    setTodos([...todos, task])
  }
  function removeTask(taskIndex) {
    const temp = [...todos]
    temp.splice(taskIndex, 1)
    setTodos(temp)
  }

  const bt = {
    backgroundColor: "blueviolet",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "50px",
    height: "50px"
  }
  const disabled = {
    backgroundColor: "slategray",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "50px",
    height: "50px"
  }

  return (
    <>
      <button
        onClick={() => {javascript: history.back()}}
        class="rounded p-3 text-4xl duration-200 ease-in-out hover:bg-violet-950"
      >
        <i class="fa-solid fa-arrow-left text-4xl"></i> Back
      </button>
      <div>
        <p>Ebin TODO List</p>
        {/* <ul>
          {todos.map(todo => (
            <li key={todo}>
              {todo}
            </li>
          ))}
        </ul> */}
        <ul className="grid gap-y-4 mb-3 mt-3 p-2 rounded bg-slate-800 shadow-slate-950 shadow-md">
          {todos.map((task, index) => (
            <li key={index + "-" + task} className="flex flex-row">
              <button onClick={() => removeTask(index)} className="mr-5 p-1 w-9 h-9 leading-3 text-violet-600 font-extrabold border-2 border-violet-600 rounded">X</button>
              <p className="self-end">{index}. {task}</p>
            </li>
          ))}
        </ul>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Type a task" class="bg-transparent text-white border-2 rounded p-2"></input>
        <button onClick={() => addTask(newTask)} class="p-2.5 m-1 rounded bg-violet-600">Add</button>

      </div>
      <div>
        <h2 style={{ marginLeft: "20px" }}>{count}</h2>
        <div className="flex flex-row">
          <button onClick={() => setCount(count - 1)} disabled={count === 0} style={bt}>-</button>
          <button onClick={() => setCount(count + 1)} style={bt}>+</button>
        </div>
      </div>
    </>
  )
}