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
import ListProductItem from './ListProductItem'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

function ListProduct() {

    const classes = useStyles();
    const [isbackdrop,setIsBackdrop] = useState(false);
    const { currentUser } = useAuth();
    const [state, dispatch] = useStateValue();
    const [products,setProducts] = useState([]);
    

    useEffect(() => {
        axios
        .get("http://localhost:8082/api/v1/products/seller-id/" + currentUser.data.seller_id)
        .then((res) => {
          console.log(res);
          setProducts(res.data);

          dispatch({
            type:'ADD_SELLER_ADDED_PRODUCTS',
            items:res.data
        })

        })
        .catch((err) => {
          console.log(err.response);
          console.log({err});
        });

    }, [])

   

  /*  useEffect(() => {
       
    }, [input])*/

    return (
        <div className="ListProduct container">

            <div className="jumbotron mt-3">
                <h1 className="display-4">Seller Dashboard</h1>
                {/* <p className="lead">Orders </p> */}
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/seller/dashboard">Seller Dashboard</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Products List</li>
                </ol>
                </nav>
                <hr className="my-4"></hr>
            </div>

            {
                   // !products &&
                   state.sellerProducts.length==0 &&
                    <div className="ListProduct__empty">
                        <h2>Your Product List is empty</h2>
                        <p>You have no items in your Product List. Please List some new products </p>
                        
                        <img src={undrawempty} alt="" className="ListProduct__empty__img"/>
                    </div> 
            }

            {
               // products &&

               state.sellerProducts.length!=0  &&
                <div>
                <table className="table  table-striped">
                    <thead className="bg-warning">
                    <tr>
                        <th scope="col" width="20%">Product Name
                        </th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total Price</th>
                        <th  scope="col">brand</th>
                        <th  scope="col">SKU</th>
                        <th  scope="col">Product Id</th>
                        <th  scope="col">Action</th>
                       
                    </tr>
                    </thead>

                    <tbody>
                    {state.sellerProducts?.map((item, index) => {
                        // console.log(item);
                        return <ListProductItem item={item} key={index} />;
                    })}
                    </tbody>
            </table>
            </div>
            }
            

            

            <Backdrop className={classes.backdrop} open={isbackdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </div>
    )
}

export default ListProduct
