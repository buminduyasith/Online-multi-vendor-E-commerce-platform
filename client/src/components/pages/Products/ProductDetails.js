import React,{useEffect,useState} from 'react'
import './ProductDetails.css'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios  from 'axios';
import {
    Link,
    useParams,
    useHistory 
} from "react-router-dom";
import {useStateValue} from '../../../states/StateProvider'
import {useAuth} from "../../../states/UserProvider"
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import undrawempty from '../../../images/undrawempty.svg'



function ProductDetails() {

    let history = useHistory();
    let { sku } = useParams();

    const [product,setproduct]=useState([]);
    const [state,dispatch] = useStateValue();
    const {currentUser} = useAuth();
    alertify.set('notifier','position', 'top-center');

    console.log(sku);

    useEffect(() => {
       
        axios.get(`http://localhost:8082/api/v1/products/${sku}`)
        .then(function (response) {
          // handle success
          setproduct(response.data);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log({error});
          console.log(error.response.data.message);
          console.error(error.response.status);
          alertify.notify( error.response.data.message, 'error', 1);
        })
        .then(function () {
          // always executed
        });
    }, [])

   
    console.log(product);

  

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }


    const addToBasket =()=>{

       if(!currentUser.authorizationjwtket){
            alertify.notify( "Please Sign-in to your account", 'error', 1);
       }

       else{

        dispatch({
            type:'ADD_TO_BASKET',
            item:{...product}
        })


       alertify.notify( "Added to cart", 'success', 1);

      }

       
       // alertify.set('notifier','position', 'top-center');
    
      
       
    }


    return (
        <div className="container mt-3">


            {    product.length==0 &&

                <div className="Myorders__empty">
                <div className="alert alert-warning">
                <h5>No products were found matching with SKU</h5>
                </div>

                <img src={undrawempty} alt=""
                style={{marginTop:"10px"}} className="Myorders__empty__img"/>

                <Link to={`/product`}className="badge badge-info p-3 mt-3"  >Product page</Link>
                </div> 




            }

        
          {  product.length!=0 &&
            <div>

            <div className="productDetails_main row">

                <div className="col-md-4 d-flex justify-content-center ">
                    <img className="Productdetails__mainphoto " src={product.pphotos} alt="" />

                    {/* 1st col */}
                </div>

                <div className="col-md-6 offset-md-1">

                <h3 className="product-title">{product?.title}</h3>
						
                <div className="row" style={{marginBottom:"20px"}}>
                        <div className="col">
                            <p className="card-text">

                           
                            Brand : <span className="badge badge-pill badge-success p-2">{product.brand}</span> 
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                            SKU : <span className="badge badge-pill badge-warning p-2">{product.sku}</span>
                           
                            </p>
                        </div>

                        

                     
                    </div>

						<h4 className="price">current price: <span>Rs {product?.price}</span></h4>

                        <h4 className="price">More than {product?.qty} produts available</h4>
						
						<div className="action">
							<button onClick={addToBasket} className="add-to-cart btn btn-default" type="button">add to cart</button>
							
						</div>
                    {/* 2md col */}
                </div>

            </div>

           <hr className="newhr"/>

           <h2>Product information</h2>

           <div className="productDetails_product__info" dangerouslySetInnerHTML={createMarkup(product.pdiscription)}></div>

           </div>

          }
            
        </div>
    )
}

export default ProductDetails


