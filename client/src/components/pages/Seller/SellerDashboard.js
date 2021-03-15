import React,{useState,useEffect} from 'react'
import './SellerDashboard.css'
// import * as mui from '@material-ui/core';
import axios from 'axios'

import AddProduct from './AddProduct'
import Orders from './Orders'
import {useAuth} from "../../../states/UserProvider"
import {useStateValue} from '../../../states/StateProvider'
import Swal from 'sweetalert2'

function SellerDashboard() {

    const [tab,settab] = useState("product");
    const {currentUser,setCurrentUser,signout} = useAuth();
    const [state,dispatch] = useStateValue();

    const handletabchange = (event)=>{
        settab(event.target.id)
    }


    useEffect(() => {
      axios.get('http://localhost:8081/api/v1/sellers?email='+currentUser.sub)
      .then(res => {
         console.log(res);
         setCurrentUser({...currentUser,data:res.data});
      })
      .catch(err => {
          console.log(err);
          console.log(err.response);
      })
  }, [])


  const handleSignout = ()=>{
       
  
    signout();
}
    

    return (

        
       <div className="Seller_dashboard container mt-2">

        <div className="jumbotron">
            <h1 className="display-4">Seller Dashboard</h1>
            <p className="lead">Hello {currentUser?.data?.seller_fname} wellcome to the MasterTech seller dashboard.</p>
            <hr className="my-4"></hr>
        </div>
      


       
          
  

 

       </div>
 
        
    )
}

export default SellerDashboard
