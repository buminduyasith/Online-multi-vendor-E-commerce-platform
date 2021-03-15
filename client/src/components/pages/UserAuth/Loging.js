import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useAuth} from "../../../states/UserProvider"
import  { useHistory } from 'react-router-dom';
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function Loging() {

    const [isbackdrop,setIsBackdrop] = useState(false);

    const classes = useStyles();

    const {currentUser,signup,Loginerror} = useAuth();
    
    const [isLoging,setIsLoging] = useState(false);

    const [iserror,setIsError] =  useState(false);

    const history = useHistory();

    const [user,setUser] = useState({
        username:"",
        password:""
    });

    

    const handleinputs = (event)=>{
        setUser({...user,[event.target.name]:event.target.value});
    }
    

    const signinuser = (event)=>{

        event.preventDefault();
     
       
        setIsLoging(true);


        setTimeout(function(){ 
            
            signup(user)
            setTimeout(()=>{
                setIsLoging(false);
            },3000)
        }, 1000);



    }

   





    return (
        <div className="signin-form container">

        <form method="post"  noValidate onSubmit={signinuser} >
            <h5>Welcome to MasterTech! Please login.</h5>
       
            <hr />

            {
                Loginerror && 
                <div className="alert alert-danger usernameerror" role="alert">
                    Username or Password incorrect please try again latter
                </div>
            }

            <div className="form-group">
            <input
                type="email"
                className="form-control"
                name="username"
                placeholder="Email"
                className= "form-control"
                value={user.username} 
                onChange={handleinputs}
                
            />
            
            </div>
            <div className="form-group">
            <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={user.password} 
                onChange={handleinputs}
            
            />
            
            </div>

            <button type="submit" onClick={signinuser} disabled={isLoging} className="btn btn-primary w-100">Sign in</button>
            

        
        </form>

     

        <Backdrop className={classes.backdrop} open={isLoging} >
                <CircularProgress color="inherit" />
      </Backdrop>


            
        </div>
    )
}

export default Loging
