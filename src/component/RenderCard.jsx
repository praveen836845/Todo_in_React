import Card from "./Card";
import React from 'react';

const RenderCard = ({ todos , state , setTodos , clearButtonRef , markAllButtonRef }) => React.useMemo(() =>{
    let filtered_todos = [];
    switch(state){
      case "All":
        filtered_todos = [...todos];
        break;
      case "Active":
        filtered_todos = todos?.filter(el => !el.completed)
        break;
      case "Completed":
        filtered_todos = todos?.filter(el => el.completed)
    }



      
      return (<div className='w-full rounded-t overflow-hidden h-[400px]  overflow-y-auto shadow-2xl bg-white'>
        { filtered_todos.length !== 0 ? filtered_todos?.map(todo => <Card key={todo.id} setTodos={setTodos} clearButtonRef={clearButtonRef} markAllButtonRef={markAllButtonRef} todo={todo} />) 
            :
            <div className="w-full h-full flex justify-center items-center text-3xl">No {state == "All" ? "" : state} ToDo's</div>
        }
      </div>)
      
  } , [todos , state])
  

  export default RenderCard