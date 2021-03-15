
import React,{useState,useEffect} from 'react'
import ShippingForm from './ShippingForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from "axios";
import { Link ,useHistory} from "react-router-dom";

import Swal from 'sweetalert2'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {useAuth} from "../../../states/UserProvider"

import { makeStyles } from '@material-ui/core/styles';
import {districtList,citieList,provinceList} from './shippingdetails'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  
  
  const schema = yup.object().shape({
    address: yup.string().required("Address is required").min(20),
    districtsSelect:yup.string().required("District is required"),
    citiesSelect:yup.string().required("City is required"),
   provincesSelect:yup.string().required("Province is required")
  
   
  
  });
  

function ShippingDetailsHome() {

    const [district, setDistrict] = useState('');
     const [province, setProvince] = useState('');
     const [city, setCity] = useState('');

    const[isloading,setIsloading] =useState(false);

    const {currentUser,setCurrentUser} = useAuth();


  const [isbackdrop,setIsBackdrop] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const {register,handleSubmit,errors,reset} = useForm({
    mode:"onBlur",
    resolver: yupResolver(schema),
  })
  alertify.set('notifier','position', 'top-center');
  
  const formSubmit =  (e) => {
    e.preventDefault();
   
  
  
    handleSubmit((data) => {

        setIsBackdrop(true);

        if(errors){
          
            console.log(data);
            setTimeout(()=>{
                setIsBackdrop(false);

                var finaladdress = `${data.address} , ${districtList[data.districtsSelect]} , ${citieList[data.citiesSelect]} , ${provinceList[data.provincesSelect]}`
                
                setCurrentUser({
                    ...currentUser,
                    address:finaladdress,
                });

                //alert(finaladdress);
                history.push("/payment");

                reset();
            },2000)
           
        }
     
        else{
           
            setIsBackdrop(false);
        }
       
    
    
    
    
    })(e)
  }
    

    return (
        <div className="container">

            <form method="post"  noValidate  onSubmit={formSubmit}>
                <h2>Shipping Details</h2>
                <p>Please fill in this form!</p>
                <hr />
                <div className="form-group">
             
                   
                    <input
                        type="text"
                        className= {"form-control " + (errors.address ? 'is-invalid' : '')}
                        ref={register}
                        name="address"
                        placeholder="your address ...."
                        
                    
                    />
                    <div className="invalid-feedback ">
                    {errors?.address?.message}
                    </div>
                   
                    </div>
                <div className="form-group">
                     <select value={district} onChange={(e)=>setDistrict(e.target.value)} className= {"form-control " + (errors.districtsSelect ? 'is-invalid' : '')}  ref={register}   name="districtsSelect">
                       
                       
                     {/* <option  disabled>Choose a salutation ...</option> */}

                        {districtList.map((item, index) =>
                         <option key={index} value={item}  data-address-value={item} value={index}>{item}</option>
                            // <MenuItem key={index} value={item}  data-address-value={item} >{item}</MenuItem>
                        )}
                    </select>

                    <div className="invalid-feedback ">
                        {errors?.districtsSelect?.message}
                    </div>

                </div>


                
                {/* --------------------------------------- */}

                <div className="form-group">
                     <select value={city} onChange={(e)=>setCity(e.target.value)} className= {"form-control " + (errors.citiesSelect ? 'is-invalid' : '')}  ref={register}   name="citiesSelect">
                        
                        {citieList.map((item, index) =>
                         <option key={index} value={item}  data-address-value={item} value={index}>{item}</option>
                            // <MenuItem key={index} value={item}  data-address-value={item} >{item}</MenuItem>
                        )}
                    </select>

                    <div className="invalid-feedback ">
                        {errors?.citiesSelect?.message}
                    </div>

                </div>

                {/* //////////////////////////////////// */}
                

                <div className="form-group">
                     <select value={province} onChange={(e)=>setProvince(e.target.value)} className= {"form-control " + (errors.provincesSelect ? 'is-invalid' : '')}  ref={register}   name="provincesSelect">
                       
                        {provinceList.map((item, index) =>
                         <option key={index} value={item}  data-address-value={item} value={index}>{item}</option>
                            // <MenuItem key={index} value={item}  data-address-value={item} >{item}</MenuItem>
                        )}
                    </select>

                    <div className="invalid-feedback ">
                        {errors?.provincesSelect?.message}
                    </div>

                </div>
                
                <div className="form-group">
                <button  type="submit" className="btn btn-primary btn-lg w-100" disabled={isbackdrop}>
                   Submit 
                </button>
                </div>
      </form>

      <Backdrop className={classes.backdrop} open={isbackdrop} >
                <CircularProgress color="inherit" />
      </Backdrop>

           


            
        </div>
    )
}

export default ShippingDetailsHome
