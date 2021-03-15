import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import UpdateProductForm from './UpdateProductForm'
import axios from "axios";
import Swal from 'sweetalert2'
import { useAuth } from "../../../states/UserProvider";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import {useForm} from 'react-hook-form'

function UpdateProduct() {

    const[product,setProduct] = useState();
    const[search,setSearch] = useState("");
    const { currentUser } = useAuth();

    const {register} = useForm();

    alertify.set('notifier','position', 'top-center');

    const handlesearch = (event)=>{
       setSearch(event.target.value);
    }

    const handleSubmit = ()=>{
        setProduct("");
        axios
        .get(`http://localhost:8082/api/v1/products/details?seller-id=${currentUser.data.seller_id}&sku=${search}`)
        .then((res) => {

          console.log(res);
          setProduct(res.data);
        })
        .catch((err) => {
            alertify.notify( "Could not find this item", 'error', 1);
          console.log(err);
          console.log({err});
        });
    }

    return (
        <div className="container">
            
            <div className="jumbotron mt-3">
                <h1 className="display-4">Seller Dashboard</h1>
                {/* <p className="lead">Orders </p> */}
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/seller/dashboard">Seller Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Product Update</li>
                </ol>
                </nav>
                <hr className="my-4"></hr>
            </div>

            <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                         
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless" value={search} onChange={handlesearch} placeholder="Product id"/>
                                    </div>
                                 
                                    <div className="col-auto ml-3">
                                        <button className="btn btn-lg btn-success" onClick={handleSubmit}>Search</button>
                                    </div>
                                  
                                </div>
                           
                        </div>
                      
                    </div>

            {
                product &&   <UpdateProductForm value={product} />
            }
          
            
        </div>
    )
}

export default UpdateProduct
