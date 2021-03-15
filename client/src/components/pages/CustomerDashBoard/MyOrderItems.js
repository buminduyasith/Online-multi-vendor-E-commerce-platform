import React, { useState, useRef, useEffect,forwardRef } from "react";
import { useStateValue } from "../../../states/StateProvider";
import { getBasketitemqty } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";
import Swal from 'sweetalert2'
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const MyOrderItems =({item:{cart,cartItem,seller}}) => {

    alertify.set('notifier','position', 'top-center');
    
const statuslist  = [
    "On hold","Processing ","delivered" ,"Processing ","delivered" ,"Pending payment","Completed","Canceled","Deleted"
  ]

  const [state,dispatch] = useStateValue();


  // useEffect(() => {
    
  // }, [state.purchaseProducts])

  const handleDeleteItem = ()=>{

    Swal.fire({
      title: 'Request Cancellation?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete('http://localhost:8085/api/v1/orders/'+cartItem.orderNumber)
        .then((response) => {
            console.log(response);
          
          
            Swal.fire({
                icon: 'success',
                title: 'Your cancellation was successful!',
                text: "please refresh the page to see new updates !",
                allowOutsideClick:false
               
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  dispatch({
                    type:'REMOVE_FROM_Purchase_Products',
                    id:cartItem.id
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

   
  }


  
  const classes = useStyles();

    //alertify.notify( "Please add a Shipping address", 'error', 2);
    return (

        
        <>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <tr  className={cartItem.deleted?"table-danger":""}>
                <td>{cartItem.productName}</td>
                <td>{cartItem.qty}</td>
                <td>{cartItem.orderNumber}</td>
                <td>{` ${value}`}</td>
                <td>{cartItem.shippingAddress}</td>
                <td>{seller.shop_name}</td>
                <td>{seller.pnumber}</td>
                <td>{cartItem.status==6?"Paid":"Not Paid"}</td>
                <td>
                <span class="badge badge-warning">
                  {
                      cartItem.deleted?statuslist[8]:statuslist[cartItem.status]
                  
                  
                  }
                </span>
              </td>
               
               <td>
                    <IconButton onClick={handleDeleteItem} disabled={cartItem.deleted}>
                        <DeleteForeverIcon color='error' fontSize="large"  />
                    </IconButton>
                    
               </td>
              
              </tr>
            </>
          )}
          decimalScale={2}
          value={cartItem.totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" Rs "}
        />
      </>
    )
}

export default MyOrderItems
