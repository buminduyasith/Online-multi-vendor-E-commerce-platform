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

const CancelOrderItem =({item:{cart,cartItem,seller}}) => {

    alertify.set('notifier','position', 'top-center');
    
const statuslist  = [
    "On hold","Processing ","delivered" ,"Processing ","delivered" ,"Pending payment","Completed","Canceled","Deleted"
  ]

  const [state,dispatch] = useStateValue();
  
  const classes = useStyles();

    //alertify.notify( "Please add a Shipping address", 'error', 2);
    return (

        
        <>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <tr>
                <td>{cartItem.productName}</td>
                <td>{cartItem.qty}</td>
                <td>{cartItem.orderNumber}</td>
                <td>{` ${value}`}</td>
                <td>{cartItem.shippingAddress}</td>
                <td>{seller.shop_name}</td>
                <td>{seller.pnumber}</td>
                <td>{cartItem.status==6?"Paid":"Not Paid"}</td>
               
               
              
              
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

export default CancelOrderItem
