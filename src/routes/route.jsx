import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import Account from '../componets/Profile'
import LoginPage from '../pages/Login'
import Header from '../componets/Header'
import Buyer from '../componets/users/Buyer'
import Seller from '../componets/users/Seller'
import Admin from '../componets/users/Admin'
import PrivateRoute from './PrivateRoutes'
import Checkout from '../componets/Checkout'
import Products from '../pages/Products'
import ProductDetails from '../componets/product/ProductDetails'

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = React.useRef({});

  useEffect(() => {
    const positions = scrollPositions.current;

    if (navigationType === "POP") {
      const savedPosition = positions[location.key];
      window.scrollTo(0, savedPosition ?? 0);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      positions[location.key] = window.scrollY;
    };
  }, [location.key, navigationType]);

  return null;
};

const RouteConfig = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/'element = {<Home/>} ></Route>
          <Route path='/products/:category'element = {<Products/>} ></Route>
          <Route path='/product/:id'element = {<ProductDetails/>} ></Route>
          <Route path='/cart'element = {<PrivateRoute><Cart/></PrivateRoute>} ></Route>
          <Route path='/wishlist'element = {<PrivateRoute><Wishlist/></PrivateRoute>} ></Route>
          <Route path='/account'element = {<Account/>} ></Route>
          <Route path='/buyer'element = {<PrivateRoute role = "buyer"><Buyer/></PrivateRoute>} ></Route>
          <Route path='/seller'element = {<PrivateRoute role = "seller"><Seller/></PrivateRoute>} ></Route>
          <Route path='/admin'element = {<PrivateRoute role = "admin"><Admin/></PrivateRoute>} ></Route>
          <Route path='/login'element = {<LoginPage/>} ></Route>
          <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteConfig