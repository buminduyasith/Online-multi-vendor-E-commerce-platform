import React, { useState, useRef, useEffect } from "react";
import { useStateValue } from "../../../states/StateProvider";
import { getBasketitemqty } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";
import Swal from 'sweetalert2'
import axios from "axios";

const statuslist  = [
  "On hold","Processing ","delivered" ,"Processing ","delivered" ,"Pending payment","Completed","Canceled",
  "Customer Canceled"
]

function OrderItem({item:{id,productName,qty,orderNumber,status,totalPrice,paid,productId,deleted,shippingAddress}}) {
  const [{ basket }, dispatch] = useStateValue();
  const [productStatus, setproductStatus] = useState(status);

  
  

  const handleinputs = (event)=>{

    setproductStatus(event.target.value);
    axios.put('http://localhost:8085/api/v1/orders?id='+id+'&status='+event.target.value)
    .then(response => {
      console.log(response);
     
      Swal.fire({
        icon: 'success',
        title: 'Product Status updated!',
        allowOutsideClick:false
       
      })
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
    });
   


  }

  return (
    <>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <tr className={deleted?"table-danger":""}>
              <td>{productName}</td>
              <td>{qty}</td>
              <td>{` ${value}`}</td>
              <td>{orderNumber}</td>
              <td>{shippingAddress}</td>
              <td>
                <span class="badge badge-warning">
                  {
                    deleted==true?statuslist[8]:statuslist[productStatus]
                  
                  }
                </span>
              </td>
              <td>{productStatus==6?"Paid":"Not Paid"}</td>
              {/* <td>shippingAddress</td> */}
              <td>
                <  select
                  class="form-control"
                  name="statusSelect"
                  value={productStatus}
                  onChange={handleinputs}
                  disabled={deleted}
                >
                  {
                  statuslist.map((option, index) => (
                    <option value={index} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </>
        )}
        decimalScale={2}
        value={totalPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" Rs "}
      />
    </>
  );
}

export default OrderItem;
