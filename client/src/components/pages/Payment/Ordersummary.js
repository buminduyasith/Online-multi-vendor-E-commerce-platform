import React from "react";
import { useStateValue } from "../../../states/StateProvider";
 import "./Ordersummary.css";
import { getBasketTotal } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";



function Ordersummary() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="ordersummary">
        <h3 className="order-summary-title">Order Summary</h3>
      <CurrencyFormat
        renderText={(value) => (
          <>

            <div className="row  justify-content-between">

                <div className="col-md-8">

                    <p className="ordersummary_subtotal_title"> 
                    Subtotal ({basket.length} items) and shipping fee included</p>

                </div>

                <div className="col-md-4">

                    <strong>{` ${value}`}</strong>

                </div>

                <div className="row  justify-content-between">
                    
                    <div className="col-md-4">
                        <span className="ordersummary_total_title">Total Amount</span>
                    </div>

                    <div className="col-md-4">
                        <span className="ordersummary_total_total_value">{` ${value}`}</span>
                    </div>

                    
                </div>

                



            </div>
           
            
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" Rs "}
      />

     
    </div>
  );
}

export default Ordersummary;


