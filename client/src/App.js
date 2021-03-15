import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Loging from './components/pages/UserAuth/Loging'
import Home from './components/Home'
import Header from './components/Header'
import Products from './components/pages/Products/Products'
import SellerDashboard from './components/pages/Seller/SellerDashboard'
import RegisterMain from "./components/pages/RegisterUsers/RegisterMain";

import CustomerDashBoard from './components/pages/CustomerDashBoard/CustomerDashBoard';
import MyOrders from './components/pages/CustomerDashBoard/MyOrders';
import CancelOrders from './components/pages/CustomerDashBoard/CancelOrders';

import Payment from './components/pages/Payment/Payment'
import Cart from './components/pages/Cart/Cart'
import Test from './Test'

import Usereducercus from './Usereducercus'
import {AuthProvider} from "./states/UserProvider"
import SellerPrivateRoute from "./SellerPrivateRoute"
import CustomerPrivateRoute from "./CustomerPrivateRoute"
import ShippingDetailsHome from './components/pages/Payment/ShippingDetailsHome'

import Orders from './components/pages/Seller/Orders'
import AddProduct from './components/pages/Seller/AddProduct'
import ListProduct from './components/pages/Seller/ListProduct'
import UpdateProduct from './components/pages/Seller/UpdateProduct'

import ProductDetails from './components/pages/Products/ProductDetails'

import Error from "./components/pages/ErrorHandling/Error";

function App() {
  return (
    <div className="App">
    <Router>
     
     <AuthProvider>

      

      <Header />

      <Switch>

      

      <Route exact path="/" component={Home} />

      <Route path="/Product/:sku" component={ProductDetails} />
      <Route path="/product" component={Products} />
  
      <Route path="/login" component={Loging} />
      <Route path="/signup" component={RegisterMain}/>

     {/* CustomerPrivateRoute */}
      <CustomerPrivateRoute path="/cart" component={Cart} />
      <CustomerPrivateRoute  path="/payment" component={Payment} />
      <CustomerPrivateRoute exact  path="/customer/orders" component={MyOrders} />
       <CustomerPrivateRoute exact  path="/customer/cancelled/orders" component={CancelOrders} />
      <CustomerPrivateRoute exact path="/customer/dashboard" component={CustomerDashBoard} />
      <CustomerPrivateRoute exact  path="/customer/shipping" component={ShippingDetailsHome} />

      
      <SellerPrivateRoute path="/seller/dashboard/orders" component={Orders} />
      <SellerPrivateRoute path="/seller/dashboard/product-add" component={AddProduct} />
      <SellerPrivateRoute path="/seller/dashboard/product-update" component={UpdateProduct} />
      <SellerPrivateRoute path="/seller/dashboard/products" component={ListProduct} />
      <SellerPrivateRoute path="/seller/dashboard" component={SellerDashboard} />

      <Route exact path="/test" component={Test} />

      

      <Route exact path="/reducer" component={Usereducercus} />
      <Route component={Error} />
      
      
       
      </Switch>

    

     </AuthProvider>

    </Router>

    </div>
   
  );
}

export default App;
