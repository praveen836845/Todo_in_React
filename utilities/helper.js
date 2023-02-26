import axios from '../axios.config'

export const addTodo = async (text) => {

    try {
        const result = await axios.post("/" ,   {
            body: JSON.stringify({
                title : text,
                userId: 1,
                completed : false,
                id : Math.floor(Math.random()*20000 + 1000)
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        console.log(JSON.parse(result?.data?.body) , "adada")

        return JSON.parse(result?.data?.body);


    } catch (error) {
        console.log(error)
    }
    
}

export const getTodo = async () => {
    try {
        const result = await axios.get("/");
        // console.log()
        return result.data.slice(0,20);
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async(id) => {
    try {
        const result = await axios.delete(`/${id}`)
        // console.log(result)
        return []
    } catch (error) {
        console.error(error)
    }
}

export const updateTodoStatus = async(todo , isComplete) => {
    try {
        const result = await axios.put(`/${todo.id}`,   {
            body: JSON.stringify({
                ...todo,
                completed : isComplete,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        // console.log(result)
        return JSON.parse(result?.data?.body);
    } catch (error) {
        console.error(error)    
    }
}

export const updateTodoText = async(todo ) => {
    try {
        const result = await axios.put(`/${todo.id}`,   {
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        // console.log(result)
        return JSON.parse(result?.data?.body);
    } catch (error) {
        console.error(error)    
    }
}
