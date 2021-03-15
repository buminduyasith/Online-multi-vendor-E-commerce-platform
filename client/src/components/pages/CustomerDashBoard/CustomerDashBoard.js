import React,{useEffect,useState} from 'react'
import {useAuth} from "../../../states/UserProvider"
import {useStateValue} from '../../../states/StateProvider'
import axios from 'axios'



import "./CustomerDashBoard.css"

function CustomerDashBoard() {

    const {currentUser,setCurrentUser,signup,signout} = useAuth();
    const [state,dispatch] = useStateValue();

    useEffect(() => {
       /* axios.post('http://localhost:8081/api/v1/customerdetails',{

            "email":currentUser.sub

        })*/
        axios.get('http://localhost:8081/api/v1/customers?email='+currentUser.sub)
        .then(res => {
            console.log("10.9");
           console.log(res);
           setCurrentUser({...currentUser,data:res.data});
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        })
    }, [])

    const handleSignout = ()=>{
       
        dispatch({
            type:"CLEAN_BASKET"
        
        });
        signout();
    }


    return (
        <div className="customer__dashboard container mt-3">

            
        <div className="jumbotron">
            <h1 className="display-4">Customer Dashboard</h1>
            <p className="lead">Hello {currentUser?.data?.fname} you are welcome to the customer dashboard.</p>
            <hr className="my-4"></hr>
        </div>
            
        </div>
    )
}

export default CustomerDashBoard
