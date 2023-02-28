import React from 'react'
import { deleteTodo, updateTodoStatus, updateTodoText } from '../../utilities/helper'

const Card = ({todo, setTodos ,clearButtonRef ,markAllButtonRef}) => {

    const isComplete = todo.completed;

    const [edit , setEdit] = React.useState(false);
    const [text , setText] = React.useState(todo.title);


    //refs
    const cardRef = React.useRef()
    const buttonRef = React.useRef()
    const deleteRef = React.useRef()

    const deleteHandler = async() => {
        deleteRef.current.classList.add("opacity-10")
        await deleteTodo(todo.id);
        deleteRef.current.classList.remove("opacity-10")

        setTodos(prev => {
            return prev.filter(el => el.id !== todo.id)
        })
    }

    
    const updateHandler = async() => {
        buttonRef.current.disabled = true;
        cardRef.current.classList.add("opacity-70")
        await updateTodoStatus(todo , !isComplete);
        setTodos(prev => {
            const idx = prev.findIndex(el => el.id === todo.id)
            prev[idx].completed = !isComplete;
            return [...prev]
        })
        cardRef.current.classList.remove("opacity-70")
        buttonRef.current.disabled = false;
        if(!isComplete)
            clearButtonRef.current.disabled = false;
        else
            markAllButtonRef.current.disabled = false;

        
    }

    //   Update the task 
    const updateTextHelper = async () => {
        todo.title = text;
        await updateTodoText(todo);
        setTodos(prev => {
            const idx = prev.findIndex(el => el.id === todo.id)
            prev[idx].title = text;
            return [...prev]
        })
    }


 
    const blurHandler =() => {
        setEdit(false)
        updateTextHelper()
    }

    const keyDownHandler = (e) => {
        if(e.key == 'Enter'){
            updateTextHelper();
            setEdit(false)
        }
    }
 

  return (
    <div ref={cardRef} className={`group w-full border-b-2 flex pr-5 justify-between border-b-gray-100 ${isComplete && 'bg-gray-100'} gap-4`}>
        <div className='flex flex-1 items-center py-4'>

            <button ref={buttonRef} className='flex justify-center items-center px-4' onClick={updateHandler}>
                <div className={`h-[25px] aspect-square border-[1px] border-gray-900 rounded-full p-[2px] ${isComplete && 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-white font-extrabold' viewBox="0 0 30 30" >
                        <path fill='#fff' d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"/>
                    </svg>
                </div>
            </button>
            {!edit ? <div className={`${isComplete && 'line-through'} text-lg text-gray-800`}>
                {todo.title}
            </div> : 
                <input autoFocus type={"text"} onKeyDown={keyDownHandler} value={text} onBlur={blurHandler} onChange={e => setText(e.target.value)} className="outline-none border-2 border-gray-200 w-full px-2 py-1 rounded-md " />
            }
        </div>
        <div className='flex gap-2 items-center'>
            <div onClick={() => setEdit(true)}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="text-black text-2xl opacity-0 group-hover:opacity-100 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
            </div>

            <div ref={deleteRef} onClick={deleteHandler} className='flex opacity-0 group-hover:opacity-100 justify-center items-center cursor-pointer '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className='text-lg' width={"25px"}>
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
                </svg>
            </div>
        </div>
    </div>
  )
}

export default Card




