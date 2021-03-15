import React, { useState, useRef, useEffect } from "react";
import { getBasketitemqty } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";
import Swal from 'sweetalert2'
import axios from "axios";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import {useAuth} from "../../../states/UserProvider"
import { useStateValue } from "../../../states/StateProvider";


function ListProductItem({item:{title,brand,availability,pthumbnail,sku,qty,price,pid}}) {

  const {currentUser} = useAuth();
  const [state, dispatch] = useStateValue();

  const handleDeleteItem =()=>{
    
    /////

   // var token  = currentUser. //"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW5pamFtaWdhcmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlNFTExFUiJ9XSwiaWF0IjoxNjE0OTI1NzM1LCJleHAiOjE2MTYwOTIyMDB9.kZX-xqFBSnZub5HVAXWJYzH7H2a8BgTIEOsq8t6RaRk";

    Swal.fire({
      title: 'Product Remove?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete('http://localhost:8082/api/v1/products/'+pid,{


          headers: {
            'Authorization': `Bearer ${currentUser?.authorizationjwtket}` 
          }

        })
        .then((response) => {
            console.log(response);
          
          
            Swal.fire({
                icon: 'success',
                title: 'Product removed successful!',
                text: "please refresh the page to see new updates !",
                allowOutsideClick:false
               
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  dispatch({
                    type:'REMOVE_SELLER_PRODUCTS',
                    id:pid
                })
                  
                } 
              })
        
        }, (error) => {
            
            console.log({error});
            console.log(error.response);
           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
               
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                   
                } 
              })
            
            });
        


        // if result.isConfirmed want to delete
      }
    })





    // Swal.fire(
    //   'Deleted!',
    //   'Your file has been deleted.',
    //   'success'
    // )

    
    
    ///alert("hi");
  }


    return (
        <>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <tr>
              <td>{title}</td>
              <td>{qty}</td>
              <td>{` ${value}`}</td>
              <td>{brand}</td>
              <td>{sku}</td>
              <td>{pid}</td>

              <td>
                    <IconButton onClick={handleDeleteItem}>
                        <DeleteForeverIcon color='error' fontSize="large"  />
                    </IconButton>
                    
               </td>
             
            
            </tr>
          </>
        )}
        decimalScale={2}
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" Rs "}
      />
    </>
    )
}

export default ListProductItem
