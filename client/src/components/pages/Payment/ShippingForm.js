// import React,{useEffect,useRef} from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import alertify from 'alertifyjs';
// import 'alertifyjs/build/css/alertify.css';


// import {useAuth} from "../../../states/UserProvider"

// import {districts,cities,provinces} from './shippingdetails'

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//     margin: {
//         marginTop: theme.spacing(3),
//         marginBottom: theme.spacing(3)
//       },
//   }));

//   const schema = yup.object().shape({
//     faddress: yup.string().required("Address is required").min(20),
//     district: yup.string().required("District is required"),
//     city: yup.string().required("City is required"),
//     province: yup.string().required("Province is required"),
//     address: yup.string().required("Address is required"),
    
   
   
//   });

 
 

// function ShippingForm() {
//   alertify.set('notifier','position', 'top-center');
//   const {register,handleSubmit,errors,reset} = useForm({
//     mode:"onBlur",
//     resolver: yupResolver(schema),
//   })

//   const {currentUser,setCurrentUser} = useAuth();

 

//     const classes = useStyles();
//     const [province, setProvince] = React.useState('');
//     const [city, setCity] = React.useState('');
//     const [district, setDistrict] = React.useState('');
//     const [address, setAddress] = React.useState('');
//     const [open, setOpen] = React.useState(false);

//     const [finaladdress,setfinaladdress] = React.useState('');


//     useEffect(() => {
      
      
//         setfinaladdress(`${address} , ${city} , ${district} , ${province}`);

//     }, [city,district,province,address])


//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave= ()=>{

//     // setCurrentUser({
//     //   ...currentUser,
//     //   address:finaladdress,
//     // });

//     schema
//       .isValid({
//         faddress: finaladdress,
//         district:district,
//         province:province,
//         city:city,
//         address:address

        
//       })
//       .then(function (valid) {

//           if(valid){
          

//             setCurrentUser(prestate=>{
//               //({...user,[event.target.name]:event.target.value}
//               return {...prestate,address:finaladdress}
  
        
             
//           });
  
  
//           setOpen(false);
//           }

//           else{
//             alertify.notify( "please add a valid Shipping address", 'error', 2);
//           }

        
      
       
//       });

      

    

   
   
  
   
//   }



//   const ProvincehandleChange = (event) => {
//     ///const { addressValue } = event.currentTarget.dataset;
//     //console.log(addressValue);
//     setProvince(event.target.value);
//   };

//   const CityhandleChange = (event) => {
//     // const { addressValue } = event.currentTarget.dataset;
//     setCity(event.target.value);
//   };
//   const DistricthandleChange = (event) => {
//     // const { addressValue } = event.currentTarget.dataset;
   
//     setDistrict(event.target.value);
//   };

//   return (
//     <div>
//       <Link  color="primary" onClick={handleClickOpen} style={{color: "#1a9cb7"}}>
//         Edit
//       </Link>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here. We will send updates
//             occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Address"
//             name='address'
//             type="text"
//             value={address}
//             error={errors.faddress}
//             helperText={errors?.address?.message}
//             onChange={e=>setAddress(e.target.value)}
//             fullWidth
//           />

//             <FormControl className={clsx(classes.margin)} fullWidth>

//             <InputLabel id="demo-simple-select-label">District</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={district}
//           onChange={DistricthandleChange}
         
//           name='district'
//           ref={register}
//           error={errors.district}
//           helperText={errors?.district?.message}

//         >
//           {/*  <MenuItem key={index} value={item.title}  data-address-value={item.title} >{item.title}</MenuItem> */}
//            {districts.map((item, index) =>
//             <MenuItem key={index} value={item}  data-address-value={item} >{item}</MenuItem>
//           )}
//         </Select>


//             </FormControl>

          
//             <FormControl className={clsx(classes.margin)} fullWidth>

//             <InputLabel id="demo-simple-select-label">City</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={city}
//           onChange={CityhandleChange}
//           fullWidth
//           error={errors.city}
//           helperText={errors?.city?.message}
//           name='city'
//           ref={register}
//         >
//           {cities?.map((item, index) =>
//             <MenuItem key={index} value={item}  data-address-value={item} >{item}</MenuItem>
//           )}
//         </Select>

//             </FormControl>

//             <FormControl className={clsx(classes.margin)} fullWidth>

//             <InputLabel id="demo-simple-select-label">Province</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={province}
//           onChange={ProvincehandleChange}
//           fullWidth
//           error={errors.province}
//           helperText={errors?.province?.message}
//           name='province'
//           ref={register}
        
//         >
//           {provinces.map((item, index) =>
//             <MenuItem key={index} value={item}   data-address-value={item} >{item}</MenuItem>
//           )}
//         </Select>


//             </FormControl>


        
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ShippingForm
