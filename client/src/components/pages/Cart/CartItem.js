import React,{useState,useRef} from "react";
import { useStateValue } from "../../../states/StateProvider";
import "./Subtotal.css";
import { getBasketitemqty } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";
function CartItem({item:{pid,brand,price,pthumbnail,title,qty,sellerid}}) {
    const [{ basket }, dispatch] = useStateValue();


    

    const qtynumber = useRef(10);

    const qtyhandle = (value)=>{
      

        console.log("work qtyhandle");

        var percount = getBasketitemqty(basket,pid);

        if(percount>=value){
            dispatch({
                type:"REMOVE_FROM_BASKET",
                id:pid
            });
        }
        else{
            dispatch({
                type:'ADD_TO_BASKET',
                item:{
                    pid,
                    title,
                    pthumbnail,
                    brand,
                    price,
                    sellerid,
                    qty
                    
                    
                }
            })
        }

       

        

        // var x = changeBasketitemqty(basket,id,qtynumber.current);
        // console.log(x);



    }

    const removeItemBasket=()=>{
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:pid
        });
    }


  return (
    <>
      <CurrencyFormat
        renderText={(value) => (
          <>
          <tr>
        <td >
          <div className="product">
            <img
              src={pthumbnail}
              alt=""
            />

            <div className="product-details">
              <h6>{title}</h6>
              {/* <span>acer shop</span> */}
              <span className="mt-2 btn badge badge-light" onClick={removeItemBasket}>Remove</span>
            </div>
          </div>
        </td>
        <td>
          <input type="number" name="qty" id="qty" min="1" max={qty} onChange={e=>qtyhandle(e.target.value)} ref={qtynumber} value={getBasketitemqty(basket,pid) }  />
        </td>
        <td>{` ${value}`}</td>
      </tr>
            

            
          </>
        )}
        decimalScale={2}
        value={getBasketitemqty(basket,pid)*price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" Rs "}
      />

     
     
    </>
  );
}

export default CartItem;
