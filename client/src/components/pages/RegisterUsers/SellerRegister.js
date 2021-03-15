import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link ,useHistory} from "react-router-dom";
import { useAuth } from "../../../states/UserProvider";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Swal from 'sweetalert2'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const schema = yup.object().shape({
  fname: yup.string().required("First name is required").matches(/^[a-z]+$/,"First name is not valid"),
  lname:yup.string().required("Last name is required").matches(/^[a-z]+$/,"Last name is not valid"),
  email:yup.string().email().required("Email is required"),
  password:
    yup.string().required("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, 'one uppercase letter, one lowercase letter, one number and one special character:'),
  pnumber:yup.string().required("Phone Number is required")
        .matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/,'Phone number is not valid'),
  shop_name:yup.string().required("Shop Name is required").matches(/^[a-zA-Z\s]*$/,"Shop name is not valid")

});



function SellerRegister() {


  const[isloading,setIsloading] =useState(false);

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
      
     
      setIsloading(true);
      setIsBackdrop(true);


       if(errors){

        axios.post('http://localhost:8081/api/v1/sellers', 
        data
    )
    .then((response) => {
       
      console.log(response);
      setIsloading(false);
        setIsBackdrop(false);
        Swal.fire({
            icon: 'success',
            title: 'Your account has been created successfully!',
            allowOutsideClick:false
           
          }).then((result) => {
         
            if (result.isConfirmed) {
            
                reset()
                history.push("/login");
            } 
          })

    }, (error) => {
      setIsloading(false);
        console.log({error});
        console.log(error.response);
        setIsBackdrop(false);
       
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
           
          }).then((result) => {
            
            if (result.isConfirmed) {

            } 
          })
        
        });
        
      } 

      else{
          
        setIsloading(false);
        setIsBackdrop(false);
      }  
      
    })(e)
  }




    return (
      <div  className="seller_register signup-form container" >
          <form method="post"  noValidate  onSubmit={formSubmit}>
        <h2>Sign Up As a Seller</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div className="form-group">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className= {"form-control " + (errors.fname ? 'is-invalid' : '')}
                ref={register}
                name="fname"
                placeholder="First Name"
                
               
              />
              <div className="invalid-feedback ">
              {errors?.fname?.message}
              </div>
            </div>
            <div className="col">
              <input
                type="text"
                className= {"form-control " + (errors.lname ? 'is-invalid' : '')}
                name="lname"
                placeholder="Last Name"
                ref={register}
              />
               <div className="invalid-feedback ">
              {errors?.lname?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="shop_name"
            placeholder="Shop Name..."
            className= {"form-control " + (errors.shop_name? 'is-invalid' : '')}
            ref={register}
          />
           <div className="invalid-feedback ">
              {errors?.shop_name?.message}
              </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            className= {"form-control " + (errors.email ? 'is-invalid' : '')}
            ref={register}
          />
           <div className="invalid-feedback ">
              {errors?.email?.message}
              </div>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            className= {"form-control " + (errors.password ? 'is-invalid' : '')}
            ref={register}
          />
           <div className="invalid-feedback ">
              {errors?.password?.message}
              </div>
        </div>
        {/* <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="confirm_password"
            placeholder="Confirm Password"
            className= {"form-control " + (errors.password ? 'is-invalid' : '')}
            ref={register}
          />
           <div className="invalid-feedback ">
              {errors?.confirm_password?.message}
            </div>
        </div> */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="pnumber"
            placeholder="Phone Number"
            className= {"form-control " + (errors.pnumber ? 'is-invalid' : '')}
            ref={register}
          />
           <div className="invalid-feedback ">
              {errors?.pnumber?.message}
            </div>
        </div>
       
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isloading}>
            Sign Up
          </button>
        </div>
      </form>

      <Backdrop className={classes.backdrop} open={isbackdrop} >
                <CircularProgress color="inherit" />
      </Backdrop>

       
    
            
      </div>
    )
}

export default SellerRegister
