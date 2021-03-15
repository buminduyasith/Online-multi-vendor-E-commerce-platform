import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../../states/UserProvider";
import { useStateValue } from "../../../states/StateProvider";
import undrawempty from '../../../images/undrawempty.svg'
import './Myorders.css';
import CancelOrderItem from './CancelOrderItem'
import FlipMove from 'react-flip-move';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function CancelOrders() {

    const [state,dispatch] = useStateValue();
    const classes = useStyles();
    const [isbackdrop,setIsBackdrop] = useState(false);
    const { currentUser } = useAuth();
    const [orders,setOrders] = useState([]);

    //edit the endpoint
    useEffect(() => {

        if(state?.DeletedProducts.length>0){

        }
        else{

            axios
            .get("http://localhost:8085/cart/customer/" + currentUser.data.customer_id)
            .then((res) => {
              console.log(res.data);
                const deleteditems = res.data.filter((item)=>item.cartItem.deleted == true);
               
               
            //  setOrders(arr);
    
              
              dispatch({
                type:'ADD_Deleted_Products',
                items:deleteditems
            })
    
            })
            .catch((err) => {
              console.log(err);
              console.log({err});
            });
        }
       

    }, [state?.purchaseProducts])

   console.log(orders);
    

    return (
        <div className="Myorders container">

            <div className="jumbotron mt-3">
                <h1 className="display-4">Customer Dashboard</h1>
                {/* <p className="lead">Orders </p> */}
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/customer/dashboard">Customer Dashboard</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Cancelled Orders</li>
                </ol>
                </nav>
                <hr className="my-4"></hr>
            </div>

            {
                    state.DeletedProducts.length==0 &&
                    <div className="Myorders__empty">
                        <h2>There are no orders cancelled yet.</h2>
                
                        
                        <img src={undrawempty} alt="" className="Myorders__empty__img"/>
                    </div> 
            }

{
                state.DeletedProducts.length!=0 &&
              
                <div className="mb-5"> 
                <table className="table  table-striped " >
                    <thead className="bg-warning">
                    <tr>
                        <th scope="col" width="25%">Product Name
                        </th>
                        <th scope="col">Qty</th>
                        <th scope="col">Order Number</th>
                        <th scope="col" width="10%">Total Price</th>
                        <th  scope="col">shipped address</th>
                        <th  scope="col">Shop Name</th>
                        <th  scope="col">Phone Number</th>
                        <th  scope="col">Paid</th>
                       
                        
                       
                    </tr>
                    </thead>

                    <tbody>
                   
                    {state.DeletedProducts?.map((item, index) => {
                        // console.log(item);
                        return <CancelOrderItem item={item} key={index} />;
                    })}
                   
                    </tbody>
{/* 
                    {
                        JSON.stringify(orders)
                    } */}
            </table>
            </div>
            }
            

            

            <Backdrop className={classes.backdrop} open={isbackdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </div>
    )
}

export default CancelOrders
