import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../states/StateProvider";
import CartItem from "./CartItem";
import "./Cart.css";
import Subtotal from './Subtotal'
import emptycartimg from '../../../images/emptycart.svg'


function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  const [disitem, setdisitems] = useState([]);
  const key = "pid";

  useEffect(() => {
    //console.log(basket);
    setdisitems([...new Map(basket.map((item) => [item[key], item])).values()]);
   // console.log(disitem);
  }, [basket]);

  return (
    <div className="container mt-4">
     
     {
                basket?.length ===0 ?(
                    <div className="cartempty">
                        <h2>You shopping Basket is empty</h2>
                        <p>You have no items in your basket to buy on or more items,click "Add to basket"
                            next to the item.
                        </p>
                        <img src={emptycartimg} alt="" className="emptycartimg"/>
                    </div>
                ) 
                :(
                  <div className="row">
                  <div className="col-md-8">
                  <table className="table">
                      <thead className="bg-warning">
                        <tr>
                          <th scope="col" width="70%">Products</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
          
                      <tbody>
                      {disitem?.map((item, index) => {
                          // console.log(item);
                           return(
                             
                              <CartItem item={item} key={index} />
                           )
                      })}
                       
                      </tbody>
                     
                    </table>
          
                    {/* 1col */}
                  </div>
          
                  <div className="col-md-4">
          
                     <Subtotal />
          
          
                  {/* 2col */}
                  </div>
          
                </div>
          
                   
                )
            }

     
      {/* <h3>cart</h3>

            
                {disitem?.map((p, index) => {
                 
                 return(
                   
                    <CartItem />
                 )
                  })}
             */}
    </div>
  );
}

export default Cart;
