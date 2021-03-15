import React from "react";
import { useStateValue } from "../../../states/StateProvider";
import "./Subtotal.css";
import { getBasketTotal } from "../../../states/reducer";
import CurrencyFormat from "react-currency-format";
import Payment from '../Payment/Payment'
import  { useHistory } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  const history = useHistory();

  const handlebtncheckout = ()=>{

    
    history.push('/customer/shipping');

  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):<strong>{` ${value}`}</strong>
            </p>

            
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" Rs "}
      />

      <button className="btn btn-success" onClick={handlebtncheckout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
