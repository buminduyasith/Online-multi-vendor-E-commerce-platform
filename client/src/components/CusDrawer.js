import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'
import {withRouter,useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useAuth} from "../states/UserProvider"
import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  

function CusDrawer() {
  const {currentUser,signout} = useAuth();
  const Sellerdrawerlist =[
    {
      text:"Add new Product",
      icon:<AddBoxIcon/>,
      onClick:()=>history.push('/seller/dashboard/product-add')
    },

    {
      text:"Orders",
      icon:<MailIcon/>,
      onClick:()=>history.push('/seller/dashboard/orders')
    }
    ,
    {
      text:"Products",
      icon:<ViewListIcon/>,
      onClick:()=>history.push('/seller/dashboard/products')
    },
    {
      text:"Product Update",
      icon:<SystemUpdateAltIcon/>,
      onClick:()=>history.push('/seller/dashboard/product-update')
     
    },
    {
      text:"Sign out",
      icon:<ExitToAppIcon/>,
      onClick:()=>signout()
    }

    //currentUser.authorities
  ]

  const Customerdrawerlist =[
    {
      text:"My Orders",
      icon:<MoveToInboxIcon/>,
      onClick:()=>history.push('/customer/orders')
    },

    {
       text:"cancelled Orders",
      icon:<MoveToInboxIcon/>,
      onClick:()=>history.push('/customer/cancelled/orders')
     
    },

    {
      text:"Sign out",
      icon:<ExitToAppIcon/>,
      onClick:()=>signout()
    }

    //currentUser.authorities
  ]

    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index)  */}
          <List>
            {
            currentUser?.authorities=="SELLER"?
            Sellerdrawerlist.map((item, index) => (
              <ListItem button key={item.text} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
            :
            Customerdrawerlist.map((item, index) => (
              <ListItem button key={item.text} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
            
            }
          </List>
          {/* <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </div>
      );
    

      return (
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
               <IconButton  onClick={toggleDrawer(anchor, true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <MenuIcon /> 
           
          </IconButton>
              {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      );
}

export default CusDrawer
