import React,{useState,useEffect,useCallback} from "react";
import Ordersummary from "./Ordersummary";
import './Payment.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email';
//import ShippingForm from "./ShippingForm"
import {useStateValue} from '../../../states/StateProvider'

import {useAuth} from "../../../states/UserProvider"
import { getBasketitemqty,getBasketTotal } from "../../../states/reducer";
import axios from 'axios'
import Swal from 'sweetalert2'
import Loding from '../../Loding'

import  { useHistory } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



function Payment() {

    const [isbackdrop,setIsBackdrop] = useState(false);
    const classes = useStyles();
    
    const {currentUser} = useAuth();

    const [state,dispatch] = useStateValue();
  

    const [purchaseItem,setpurchaseItem] = useState([]);

    const [purchaseDetails,setpurchaseDetails] = useState([]);

    const [cartRequestData,setcartRequestData] = useState({});

    const [isProcesss,setisProcesss] = useState(false);

    const [isloading,setisloading] = useState(false);

    const [btndisable,setbtndisable] = useState(false);

   
    const [cartList,setcartList] = useState([]);

    const [response,setResponse] = useState({});

    const history = useHistory();

    alertify.set('notifier','position', 'top-center');
   
    const key = "pid";

    useEffect(() => {
        console.log(state.basket);
        console.log("payment");
        setpurchaseItem([...new Map(state.basket.map((item) => [item[key], item])).values()]);
       
       //console.log(purchaseItem);

    

      }, [state.basket]);


      useEffect(() => {

        setpurchaseDetails([]);
        purchaseItem.map((item,index)=>{
        
        
            setpurchaseDetails(prestate=>([
                ...prestate,
                {
                    item:item,
                    itemqty:getBasketitemqty(state.basket,item.pid),
                    itemOrder:new Date().getTime()
      
                }
            ])) 
        
    
         
    
    
        })
         
      }, [purchaseItem])

      useEffect(() => {
        purchaseDetails.map((item,index)=>{
            
            
        
            setcartList(prestate=>([
                ...prestate,
                {
                    productId:item.item.pid,
                    sellerId:item.item.sellerid,
                    productName:item.item.title,
                    qty:item.itemqty,
                    totalPrice:item.item.price,
                    orderNumber:item.itemOrder,
                    status:1,
                    paid:false,
                    shippingAddress:currentUser.address
                   
                   
    
                }
            ])) 
        
    
         
    
    
        })
      }, [purchaseDetails])//purchaseDetails


   /* useEffect(() => {


        cartList.map((item,index)=>{
            
            // setcartList(prestate=>([
            //     ...prestate,
            //     {...item,shippingAddress:currentUser.address}
            // ])) 

        })


        
         
      }, [currentUser.address])*/



      useEffect(() => {
        
        if(isloading){

  console.log("cartRequestData");
            console.log(cartRequestData);
           
            console.log("i requesting");
            axios.post('http://localhost:8085/cart', 
                cartRequestData
            )
            .then((response) => {
                console.log(response);
                setResponse(response.data);
                setisloading(false);
                cleancart();
            //        dispatch({
            //     type:'ADD_TO_Purchase_Products',
            //     items:cartRequestData
            // })
                setIsBackdrop(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you for your purchase!',
                    allowOutsideClick:false
                   
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                    
                      cleancart();
                      history.push('/product')
                    } 
                  })

            }, (error) => {
                setbtndisable(false);
                console.log(error);
                console.log(error.response);
                setisloading(false);
                cleancart();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                   
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        console.log("/products");
                      //history.push('/product')
                    } 
                  })
                
                });
                
                setIsBackdrop(false);
        
       
        }

       
     

      }, [cartRequestData])

     /* useEffect(() => {
        let newarrayOfObjects = cartList.map(e => {
            return {
              ...e,
              shippingAddress:currentUser.address
             }
            });

        setcartList(newarrayOfObjects);
      }, [currentUser.address])*/




      
   
    
     
     /* const setcartlistfunction = ()=>{
        let newarrayOfObjects = cartList.map(e => {
            return {
              ...e,
              shippingAddress:currentUser.address
             }
            });

        setcartList(newarrayOfObjects);
      }

      const setcartRequestDataFunction = ()=>{
        setcartRequestData({
            totalPrice:getBasketTotal(state.basket),
            fkCusId:currentUser.data.customer_id,
            cartDate:new Date(),
            itemCount:state.basket.length,
            cartItems:cartList

        })
      }*/
   

    const testrqeust = ()=>{
        //setpurchaseDetails("");
        //setcartList("");

        setisloading(true)
        setbtndisable(true);
        setIsBackdrop(true);

        if(currentUser.address==undefined || currentUser.address==null || currentUser.address==='' ){
            setisloading(false)
            setbtndisable(false);
            setIsBackdrop(false);
            alertify.notify( "Please add a Shipping address", 'error', 2);
            return;
        }

        else{

          /*  let newarrayOfObjects = cartList.map(e => {
                return {
                  ...e,
                  shippingAddress:currentUser.address
                 }
                });
    
            setcartList(newarrayOfObjects);*/

            setTimeout(()=>{


               
            
               setcartRequestData({
                    totalPrice:getBasketTotal(state.basket),
                    fkCusId:currentUser.data.customer_id,
                    cartDate:new Date(),
                    itemCount:state.basket.length,
                    cartItems:cartList
        
                })


            },3000)
        }

        // //testing purpose
        // else{
        //     setisloading(false)
        //     setbtndisable(false);
        //     setIsBackdrop(false);
        //     alertify.notify( "ok", 'error', 2);
        // }

       
        console.log("wait");

       // uncomment this after validating shippingform
 

   
    }
      
    
   /* ()=>{
     

        setpurchaseDetails("");
        setcartList("");

    purchaseItem.map((item,index)=>{
        
        
        setpurchaseDetails(prestate=>([
            ...prestate,
            {
                item:item,
                itemqty:getBasketitemqty(state.basket,item.pid),
                itemOrder:new Date().getTime()
  
            }
        ])) 
    

     


    })


    purchaseDetails.map((item,index)=>{
        
        
        setcartList(prestate=>([
            ...prestate,
            {
                productId:item.item.pid,
                sellerId:item.item.sellerid,
                productName:item.item.title,
                qty:item.itemqty,
                totalPrice:item.item.price,
                orderNumber:item.itemOrder,
                status:1,
                paid:false

            }
        ])) 
    

     


    })

    

    setcartRequestData({
        totalPrice:getBasketTotal(state.basket),
        fkCusId:currentUser.data.customer_id,
        cartDate:new Date(),
        itemCount:state.basket.length,
        cartItems:cartList
    })

    // setTimeout(()=>{
    //     setisProcesss(true);
    // },3000);
    

    }*/

    const cleancart= ()=>{
        dispatch({
            type:"CLEAN_BASKET"
        
        });
    }
    


  return (
    <div className="payment container">

        
        
        <div>

        <h2 className="main-title">Select Payment Method </h2>
        
        <div className="row  justify-content-between">

            <div className="payment_basic_summary col-md-6">

                <div className="payment_basic_summary_paymentMethod row">

                    <div className="card" style={{ width: "11rem" , height:"9rem" }}>

                        <img
                            src="https://laz-img-cdn.alicdn.com/tfs/TB1utb_r8jTBKNjSZFwXXcG4XXa-80-80.png"
                            alt=""  className="rounded mx-auto d-block cashonDelivary_img" 
                        />
                        <div className="card-body">
                            <p className="payment_delivary_subtitle">Cash On Deliverye</p>
                           
                        </div>

                    </div>
                    


                    {/* payment_basic_summary_paymentMethod */}
                </div>

                <div className="payment_basic_summary_order_summary row mt-2">

                    <div className="card">

                        <div className="car-body p-4">

                            <Ordersummary /> 

                        </div>
                    </div>

                    

                {/* payment_basic_summary_order_summary row */}
                </div>

                <div className="payment_basic_summary_confirm row mt-2">

                    <div className="card">
                        <div className="card-body">
                        <p> You can pay in cash to our courier when you receive the goods at your doorstep.</p>
                        <button onClick={testrqeust} disabled={btndisable} className="btn btn-lg btn-info">Confirm Order</button>
                        </div>
                    </div>

                </div>


            {/* paymeny_basic_summary */}

            </div>

            <div className="payment_shipping_details col-md-5 ">

                <div className="card p-3">

                    <div className="checkout_address ">

                        <p className="address-hat">Shipping & Billing</p>

                        <div className="row  justify-content-between mb-1">

                            <div className="col-md-6">
                                < LocationOnIcon style={{ color:"#5bbbce" }} />
                                <span className="address-title">{currentUser.data.fname + " "+ currentUser.data.lname }</span>
                            </div>


                            <div className="col-md-3">
                            {/* <ShippingForm /> */}
                            {/* <a className="edit-address">Edit</a> */}
                            </div>

                        

                        </div>

                        <div className="row  mb-2">

                            <div className="address-info-item address-value">

                                <span className="badge badge-light">Home</span>
                                {/* 123 aba mara ratnapura bithm, Bolthumbe, Ratnapura, Sabaragamuwa */}
                                <span>{currentUser.address ?currentUser.address:"Please add a shipping address"}</span>

                            </div>

                    

                        </div>
                        
                        <div className="row justify-content-between  mb-2">

                            <div className="col-md-6">
                                
                                <PhoneIcon style={{ color:"#5bbbce" }} />

                                    <span className="address-title">{currentUser.data.pnumber}</span>

                            </div>


                            {/* <div className="col-md-3">

                                <a className="edit-address">Edit</a>

                            </div> */}

                        </div>

                        <div className="row justify-content-between  mb-2">

                            <div className="col-md-8">
                                
                                <EmailIcon style={{ color:"#5bbbce" }} />

                                    <span className="address-title">{currentUser.sub}</span>

                            </div>


                            {/* <div className="col-md-2">

                                <a className="edit-address">Edit</a>

                            </div> */}

                        </div>

                        <div className="row test">

                               

                        </div>
                    </div>

                </div>

                
            </div>

        </div>

        </div>            
                           
        

        <Backdrop className={classes.backdrop} open={isbackdrop} >
                <CircularProgress color="inherit" />
        </Backdrop>
      
        
     
    </div>
  );
}

export default Payment;
