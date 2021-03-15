import { StarRate } from '@material-ui/icons';
import React,{useEffect,useState,useReducer} from 'react'


// function reducer(state,action){

//     switch(action.type){
//         case 'increment':
//             return {count:state.count+1}
//         case 'decrement':
//             return {count:state.count-1}
//         default:
//             return state;
//     }
// }

const items = [
    {
        cart:{
            id:1,
            name:"bumidu"
        },

        cartItem:{
            pid:1,
            sellername:"dialog",
            isdel:true
        }
    },

    {
        cart:{
            id:2,
            name:"yasith"
        },

        cartItem:{
            pid:2,
            sellername:"mobitel",
            isdel:true
        }
    },
      {
        cart:{
            id:3,
            name:"rangana"
        },

        cartItem:{
            pid:3,
            sellername:"aitel",
            isdel:false
        }
    }
]

function Test() {

    /*const [valueNormal,setvalueNormal] = useState(()=>{
        return 1;
    })*/

    const index2 = items.findIndex((item)=>item.cartItem.pid ===1);

    console.log("index2");

    const arr = items.filter((item)=>item.cartItem.isdel == false);

    // var marvelHeroes =  items.filter(function(hero) {
    // return hero.franchise == “Marvel”;
    // });

    console.log(arr);
    
    /*const [state,dispatch] = useReducer(reducer,{count:0});

    const [cusstate,setstate] = useState({
        value:0,
        color:"red"
    })

    const [value,setvalue]=useState(()=>{
        return 5;
    })

    const [user,setuser]=useState({
        name:"",
        age:""
    })*/
    

   /* const increment=() =>{

        dispatch({
            type:"increment"
        })

       // setvalue(preval=>preval+1);
    }*/

  /*  const decrement=() =>{

      /*  setvalue(preval=>{
           return preval==0?preval:preval-1; 
        });*/

      /*  dispatch({
            type:"decrement"
        })
    }

    const submit=()=>{
        console.log(user);
    }

    const handleinput = (e)=>{

        setuser(prestate=>{
            //({...user,[event.target.name]:event.target.value}
            return {...prestate,[e.target.name]:e.target.value}
        })

    }*/

    



  /*  const increment = ()=>{
        setstate(prestate=>{
            return {...prestate,value:prestate.value+1}
    })
    }

    const decrement = ()=>{
        setstate(prestate=>{
            return{...prestate,value:prestate.value-1}
        })
    }*/



    return (
        <div>
            
            {/* <button onClick={increment}>+</button> */}
            {/* <h1>{state.value}</h1>
            <h1>{state.color}</h1> */}
            {/* <h1>{state.count}</h1>
            <button onClick={decrement}>-</button> */}

            {/* <input type="text" name="name" onChange={handleinput} value={user.name}/>
            <input type="text" name="age" onChange={handleinput} value={user.age}/>
            <button onClick={submit}>ok</button> */}




        </div>
    )
}

export default Test
