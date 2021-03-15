import React from "react";
import {useStateValue} from '../../../states/StateProvider'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import {useAuth} from "../../../states/UserProvider"
import {Link} from 'react-router-dom'


function Product ({product:{pthumbnail,title,brand, price,pid,qty,sellerid,sku,availability}}) {

    const [state,dispatch] = useStateValue();
    const {currentUser} = useAuth();
    alertify.set('notifier','position', 'top-center');

    const addToBasket =()=>{

       if(!currentUser.authorizationjwtket){
            alertify.notify( "Please Sign-in to your account", 'error', 1);
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
                qty,
                sku,
                availability
            }
        })

        alertify.notify( "Added to cart", 'success', 1);

       }

       
       // alertify.set('notifier','position', 'top-center');
    
      
       
    }


  return (
    
      <div className="card mb-2" >
            <div className="row align-items-center md-auto">
                <div className="col-4 d-flex justify-content-center"  style={{width:"100%"}}  >
                    <img className="rounded" style={{width:"100%",marginLeft:"10px"}} src={pthumbnail} alt="Card image cap" />
                </div>

                <div className="col-8">
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    
                    <div className="row">
                        <div className="col">
                            <p className="card-text">

                           
                            Brand : <span class="badge badge-pill badge-success p-2">{brand}</span> 
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                            Price : <span className="badge badge-pill badge-warning p-2"> {price} Rs</span>
                           
                            </p>
                        </div>

                        <div className="col">
                            
                        <Link to={`/product/${sku}`} 
                        
                        className="badge badge-info p-2"  >Read More</Link>
                            {/* <span onClick={alert("yo")} style={{cursor:"pointer"}} className="readmore badge badge-pill badge-info">Read More</span> */}
                            
                        </div>


                     
                    </div>

                   {

                    currentUser?.authorities=="CUSTOMER" &&
                    <button  onClick={addToBasket} className="btn btn-primary" style={{width:"100%",marginTop:"20px"}}>
                        Add to Basket
                    </button>

                   } 
                    </div>
                </div>
            </div>
        </div>
   
  );
}

export default Product;
