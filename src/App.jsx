import React from 'react';
import { addTodo, deleteTodo, getTodo, updateTodoStatus } from '../utilities/helper';
import RenderCard from './component/RenderCard';


const App = () => {
  //States
  const [todos , setTodos] = React.useState([]);
  const [state , setState] = React.useState("All")
  const [inputText , setInputText] = React.useState("");

  //Filtered Options
  const states = ['All' , 'Active' , 'Completed']

  //Refs
  const inputRef = React.useRef()
  const clearButtonRef = React.useRef()
  const markAllButtonRef = React.useRef()


  // OnLoading 
  // Load the todo's from API

  React.useEffect(() => {
    getTodo().then(data => {
      setTodos(data)
    })
  }, [])

  //Handlers Functions

  // Change the button styles and Filters
  const stateHandler = (el) => {
    setState(el)
  }




  // Add Todo's to todo state after 
  // updating to the API if(text !== '')
  const inputHandler = async(e) => {
      if(e.key === 'Enter' && inputText !== ""){
        inputRef.current.disabled = true
        inputRef.current.classList.add("opacity-20") 
        
        const todo = await addTodo(inputText)
        setTodos(prev => {
          return [todo, ...prev ]
        })
        inputRef.current.disabled = false
        markAllButtonRef.current.disabled = false
        inputRef.current.focus()
        inputRef.current.classList.remove("opacity-20") 
        setInputText("")

      }
  }

  const markAllCompletedHandler = async () => {


    //Make the button disabled
      markAllButtonRef.current.disabled = true;

      const responsePromises = todos.map(async(todo) => {
        return await updateTodoStatus(todo , true);
      })
      const responseArray = await Promise.all(responsePromises)
      setTodos(prev => prev.map(el => ({...el , completed : true})))
      clearButtonRef.current.disabled = false;
      
    
  }


  const removeAllCompletedHandler = async () => {

  // Clear all the completed Todo's
    const clearHandler = () => {
      setTodos(prev => prev.filter(el => !el.completed))
    }
    //Make the button disabled
    clearButtonRef.current.disabled = true;

    
    try {
      const responsePromises = todos.map(async(todo) => {
        if(todo.completed)
          return await deleteTodo(todo.id);
      })
      await Promise.all(responsePromises)
      
    } catch (error) {

      alert(error)
      clearButtonRef.current.disabled = false;
    }
    
    clearHandler()
  }

  return (
    <div className='flex justify-center items-center py-4 min-h-screen flex-col bg-background-theme'>
      <div className='max-w-[650px] w-[90%]'>
        <div className='flex items-center justify-between'>
          <h1 className='mb-5 text-6xl uppercase font-extrabold tracking-wide text-white'>ToDo'S</h1>
          <button ref={markAllButtonRef} className='text-sm text-gray-800 ' onClick={markAllCompletedHandler} >Mark all Completed</button>
        </div>
        <div className='flex mb-10 rounded-md overflow-hidden w-full bg-white opacity-100 pl-[4rem] shadow-xl'>
          <input ref={inputRef} placeholder='Enter your todos' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full py-3 text-xl pr-2 rounded-br-md rounded-tr-md  outline-none' onKeyDown={inputHandler} />
        </div>


        <RenderCard todos={todos} state={state} setTodos={setTodos} clearButtonRef={clearButtonRef} markAllButtonRef={markAllButtonRef} />

        
        <div className='h-[60px] shadow-4xl border-t-[1px] border-t-gray-200 px-5 flex items-center justify-between rounded-b bg-white'>
          <span className='text-xs text-gray-400'>{ todos?.filter(el => !el.completed)?.length } items left</span>
          <div className='flex gap-[0.9rem] text-sm text-gray-500'>
            {states.map(el => (
              <button onClick={() => stateHandler(el)} key={el} className={`${state === el && 'text-blue-500'} capitalize`}>{el}</button>
            ))}
          </div>
          <button ref={clearButtonRef} className='text-xs text-gray-600' onClick={removeAllCompletedHandler} >Clear Completed</button>
        </div>

      </div>
    </div>
  )
}

export default App