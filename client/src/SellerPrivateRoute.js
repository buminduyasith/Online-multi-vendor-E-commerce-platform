import React from 'react'
import {useAuth} from "./states/UserProvider"
import { BrowserRouter as Router , Redirect,Route } from 'react-router-dom';

const SellerPrivateRoute = ({component: Component, ...rest}) => {

    const {currentUser} = useAuth();

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            currentUser?.authorities=="SELLER"?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default SellerPrivateRoute;