import React,{useState,useRef,useEffect} from "react";
import "./Register.css";

import SellerRegister from './SellerRegister'
import ClientRegister from './ClientRegister'

function RegisterMain() {

    const [displayForm,setdisplayForm] = useState({
        customerForm:true,
        sellerForm:false
    })

    const handleDisplayform = (event)=>{

       // alert(event.target.id);
        if(event.target.id ==="btn_cus_reg"){
            setdisplayForm({
                customerForm:true,
                sellerForm:false
            })
        }
        else if(event.target.id ==="btn_seller_reg"){
            setdisplayForm({
                customerForm:false,
                sellerForm:true
            })
        }
    }

  return (
    <div className="signup-form container">
        
        <div className="d-flex justify-content-around mb-3">
            <button className="btn btn-info " id="btn_cus_reg" onClick={handleDisplayform}>Customer Register</button>
            <button className="btn btn-info"  id="btn_seller_reg" onClick={handleDisplayform}>Seller Register</button>
        </div>

      {displayForm.customerForm && <ClientRegister />}

      { displayForm.sellerForm && <SellerRegister/> }

      
    </div>
  );
}

export default RegisterMain;
