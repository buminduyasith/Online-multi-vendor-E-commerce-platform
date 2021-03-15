import React, { useEffect, useState } from "react";
import { useAuth } from "../../../states/UserProvider";
import { useStateValue } from "../../../states/StateProvider";
import axios from "axios";
import OrderItem from './OrderItem'
import { Link } from "react-router-dom";

function Orders() {
  const { currentUser } = useAuth();
  const [state, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/orders/sellers/" + currentUser.data.seller_id)
      .then((res) => {
        console.log(res);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  return (
    <div className="orders container" >
     
      <div className="jumbotron mt-3">
            <h1 className="display-4">Seller Dashboard</h1>
            {/* <p className="lead">Orders </p> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/seller/dashboard">Seller Dashboard</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Orders</li>
              </ol>
            </nav>
            <hr className="my-4"></hr>
        </div>

      <table className="table  table-striped">
        <thead className="bg-warning">
          <tr>
            <th scope="col" width="20%">Product Name
            </th>
            <th scope="col">Qty</th>
            <th scope="col">Total Price</th>
            <th  scope="col">Order Number</th>
            <th  scope="col" width="20%">shipping Details</th>
            <th  scope="col">Status</th>
            <th  scope="col">Payment</th>
            <th  scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((item, index) => {
            // console.log(item);
            return <OrderItem item={item} key={index} />;
          })}
        </tbody>
      </table>

      {/* <div>{JSON.stringify(orders)}</div> */}
    </div>
  );
}

export default Orders;
