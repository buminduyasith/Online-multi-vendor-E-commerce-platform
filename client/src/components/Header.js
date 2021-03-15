import React from 'react'
import {Link} from 'react-router-dom'
 import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useStateValue} from '../states/StateProvider'
import {useAuth} from "../states/UserProvider"

import CusDrawer from './CusDrawer'



{/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
// </li>

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: "none",
    backgroundColor: "#FFC107" ,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
 
  title: {
    flexGrow: 1,
  },

  links:{
    "&:hover": {
      color: '#000',
   }
  }

}));


function Header() {


  const {signup,currentUser} = useAuth();

  const classes = useStyles();

  const [state,dispatch] = useStateValue();


    return (
      <div className={classes.root}>
      <AppBar position="static" className={classes.root} >
        <Toolbar>

        {
            currentUser?.authorizationjwtket && 
           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             {/* <MenuIcon /> */}
             <CusDrawer />
           </IconButton>
        }
       
          <Typography variant="h6" className={classes.title}>
             MasterTech
          </Typography>
          
          <Button color="inherit" className={classes.links}  component={Link} to="/"  >Home</Button>

          {
            !currentUser?.authorizationjwtket && 
            <Button color="inherit" className={classes.links}   component={Link} to="/login" >Login</Button>
          }

          {
            !currentUser?.authorizationjwtket && 
            <Button color="inherit" className={classes.links} component={Link} to="/signup" >Sign Up </Button>

          }

         

        

          <Button color="inherit" className={classes.links} component={Link} to="/product" >Product</Button>

          {
               currentUser?.authorities=="SELLER" &&  <Button color="inherit" className={classes.links} component={Link} to="/seller/dashboard" >Seller</Button>
               
          }

        
          {
             currentUser?.authorities=="CUSTOMER" && 
            <IconButton edge="start"  color="inherit" aria-label="menu" component={Link} to="/cart">
              <ShoppingBasketRoundedIcon />
              <span className="badge badge-light">{state?.basket?.length}</span>
             
            </IconButton>
          }

          {
            currentUser?.authorities=="CUSTOMER" && 
            <IconButton edge="start"  color="inherit" aria-label="menu" component={Link} to="/customer/dashboard">
              <AccountCircleIcon />
             
            </IconButton>
          }
          
             
            
        </Toolbar>
      </AppBar>
      
    </div>
    )
}

 
 
 export default Header
