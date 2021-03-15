import { StarRate } from '@material-ui/icons';
import React,{useEffect,useState,useReducer} from 'react'
import Todo from "./Todo"

const ACTION={
    ADDTODO:"addtodo",
    DELETETODO:"deletetodo"
}


function todoreducer(state,action){
    console.log("wow");
    switch(action.type){
        case ACTION.ADDTODO:
            return [...state,newTodo(action.payload.todo)];
        case ACTION.DELETETODO:
            console.log(action.payload.id)
             return state;

        default:
            return state;

    }
}

const newTodo=(todo)=>{

    console.log(todo);

    return{
        id: Date.now(),
        value:todo,
        completed:false

    }
}


function Test() {



   
    const [todo,settodo] =useState("");
    const [state,dispatch] = useReducer(todoreducer,[]);

    

    const addTodo = ()=>{

        console.log(todo);

        dispatch({
            type:ACTION.ADDTODO,
            payload:{
                todo:todo
            }
        })

        settodo("");
    }
    

   
    return (
        <div>
            
            <input type="text" name="todo" value={todo} onChange={e=>settodo(e.target.value)}/>
            <button onClick={addTodo}>Add todo</button>

            <div className="todos">
                {
                    state.map((todo, index) => {
                        return (
                           <Todo key={index} todo={todo} dispatch={dispatch} />
                        );
                    })
                }
            </div>

        </div>
    )
}

export default Test
