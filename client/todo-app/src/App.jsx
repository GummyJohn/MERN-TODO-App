import { useState, useEffect } from 'react'


function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])

  async function handleSubmit(e){
    e.preventDefault()
    
    try{
      await fetch('http://localhost:4000/api/add', {
        method: "POST",
        headers : {
          "Content-Type": "text/plain",
        },
        body : task,
      })

      setTodos([...todos, {"todo": task}])
    }catch(err){
      console.log(`Error: POST request failed , ${err}`)
    }
    
    setTask('')
  }

  async function handleDelete(id){
    try{
      await fetch('http://localhost:4000/api/delete', {
        method: 'DELETE',
        headers: {
          "Content-Type" : "text/plain"
        },
        body: id
      })

      const filteredTodos = todos.filter((todo) => id !== todo._id);
      setTodos(filteredTodos);

    }catch(err){
      console.log(`Error: Delete failed, ${err}`)
    }
  }

  useEffect(() => {
    async function getTodos() {
      try{
        const response = await fetch('http://localhost:4000/api');
        const data = await response.json();
        setTodos(data)
      }catch(err){
        console.log(`Error: ${err}`)
      }
    }

    getTodos();
  }, [todos])

  return (
    <div className='flex justify-center flex-col items-center'>
      
      <form onSubmit={handleSubmit}>
        <h1 className='text-3xl my-4 text-center'>
          Todo App W. NodeJs
        </h1>

        <div className='w-[500px]'>
          <label htmlFor="todo">Add To Your List:</label>
          
          <div className='flex items-center my-4'>
            <input type="text" id="todo"
              className='w-full border border-blue-500 p-2 rounded-tl-2xl rounded-bl-2xl'
              autoComplete='off'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button 
              className='border py-2 px-4 border-blue-500 bg-blue-500 text-white hover:bg-black rounded-tr-2xl rounded-br-2xl'
            >
              Add
            </button>
          </div>
        </div>

      </form>

      <div className='mt-5'>
        {todos.map((todo) => {
          return (
            <div
              key={todo.todo} 
              className=' flex items-center justify-between 
                w-[500px] p-2
              '
            >
              <p>
                {todo.todo}
              </p>
              <button 
                onClick={() => handleDelete(todo._id)}
                className='border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:bg-red-500'
              >
                Complete
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
