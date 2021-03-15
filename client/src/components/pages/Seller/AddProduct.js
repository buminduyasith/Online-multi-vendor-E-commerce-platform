import React, { useState } from "react";


import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../states/UserProvider";
import AddProductFrom from './AddProductFrom'

function AddProduct() {
  return (
    <div className="AddProduct container">
      <div className="jumbotron mt-3">
        <h1 className="display-4">Seller Dashboard</h1>
        {/* <p className="lead">Orders </p> */}
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/seller/dashboard">Seller Dashboard</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Add Products
            </li>
          </ol>
        </nav>
        <hr className="my-4"></hr>
      </div>
      <div>
            <AddProductFrom />
      </div>
    </div>
  );
}

export default AddProduct;
