import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/index";
import "./Products.css";
import Product from "./Product";
import axios from 'axios';
import undrawempty from '../../../images/undrawempty.svg'


export default function Products() {
  const [products, setproducts] = useState([]);
  const [categoryitemActivated,setcategoryitemActivated] =useState("1");
  var baseurl = 'http://localhost:8082/api/v1/category';
  useEffect( () => {
    
    console.log("hi");
    baseurl = baseurl+"/"+categoryitemActivated;
    console.log(baseurl);
    axios.get(baseurl)
        .then(res=>{
            console.log(res);
            setproducts(res.data.productList);
        })
        .catch(err=>{
          console.log({err})
        })

    //setproducts(fetchedData);

    //console.log(fetchedData);
  }, [categoryitemActivated]);


  const categorychange = (event)=>{

   
    setcategoryitemActivated(event.target.getAttribute("data-id"));
    console.log(categoryitemActivated);

  }


  return (
    <div className="container mt-3">
        
        <div className="jumbotron">
            <h1 className="display-4">Products</h1>
            {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p> */}
            <hr className="my-4"></hr>
        </div>
      

      <div className="row mt-5">
        <div className="col-md-3 ">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">Featured</div>
            <ul className="list-group list-group-flush ">
              <a className={'list-group-item list-group-item-action ' + (categoryitemActivated === "1" ? "active" : "")}  data-id="1"  onClick={categorychange} >Laptop</a>
              <a className={'list-group-item list-group-item-action ' + (categoryitemActivated === "2" ? "active" : "")} data-id="2" onClick={categorychange}>Desktop Workstation</a>
              <a className={'list-group-item list-group-item-action ' + (categoryitemActivated === "3" ? "active" : "")}   data-id="3" onClick={categorychange}>GAMING Workstation</a>
              <a className={'list-group-item list-group-item-action ' + (categoryitemActivated === "4" ? "active" : "")}   data-id="4" onClick={categorychange}>GRAPHIC CARDS</a>
            </ul>
          </div>

            {/* <a className={'list-group-item list-group-item-action' + (categoryitemActivated === "2" ? "active" : "")} >dd</a> */}
          {/* 1col */}
        </div>

        <div className="col-md-8 offset-md-1">
          {/* <div className=" d-flex flex-column"> */}
            {
              products.length!=0?
              products.map((product, index) => {
              return <Product product={product} key={index} />
            
            }):

            <div className="Myorders__empty">
              <div className="alert alert-warning">
                <h5>No products were found matching your selection</h5>
              </div>
 
            <img src={undrawempty} alt=""
             style={{marginTop:"10px"}} className="Myorders__empty__img"/>
            </div> 


            
            }
          {/* </div> */}

          {/* 2col */}
        </div>

        {/* 2row */}
      </div>
    </div>
  );
}
