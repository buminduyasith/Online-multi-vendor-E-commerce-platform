import React from 'react'

function Todo({todo,dispatch}) {
    console.log(todo);
    return (
        <div>

            <span style={{color:todo.complete?"#FF0000":"#000"}}>ss{todo.value}</span>
            <button>delete</button>
            <button onClick={dispatch({type:"deletetodo",payload:{id:todo.id}})}>toggle</button>
            
        </div>
    )
}

export default Todo
