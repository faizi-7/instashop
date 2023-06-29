import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import App from './App.jsx'  
import './main.css'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen/ProductScreen.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import CartScreen from './screens/CartScreen/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute/AdminRoute.jsx'
import OrderListScreen from './screens/Admin/OrderListScreen/OrderListScreen.jsx'
import ProductListScreen from './screens/Admin/ProductListScreen/ProductListScreen.jsx';
import ProductEditScreen from './screens/Admin/ProductEditScreen/ProductEditScreen.jsx';
import UserListScreen from './screens/Admin/UserListScreen/UserListScreen.jsx';
import UserEditScreen from './screens/Admin/UserEditScreen/UserEditScreen.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <PayPalScriptProvider deferLoading= { true }>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route index element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route path= "product/:id" element={<ProductScreen/>} />
              <Route path= "cart" element={<CartScreen/>} />
              <Route path="login" element= {<LoginScreen/>}/>
              <Route path="register" element= {<RegisterScreen/>}/>
              <Route path= '' element= {<PrivateRoute/>}>
                <Route path="shipping" element= {<ShippingScreen/>}/>
                <Route path="payment" element= {<PaymentScreen/>}/>
                <Route path= "placeorder" element= {<PlaceOrderScreen/>}/>
                <Route path= "order/:id" element= {<OrderScreen/>}/>
                <Route path= "profile" element= {<ProfileScreen/>}/>
              </Route>
              <Route path='' element= {<AdminRoute/>}>
                <Route path='admin/orderlist' element= {<OrderListScreen/>}/>
                <Route path='admin/productlist' element= {<ProductListScreen/>}/>
                <Route path='admin/productlist/:pageNumber' element= {<ProductListScreen/>}/>
                <Route path='admin/product/:id/edit' element= {<ProductEditScreen/>}/>
                <Route path='admin/userlist' element= {<UserListScreen/>}/>
                <Route path='admin/user/:id/edit' element= {<UserEditScreen/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
