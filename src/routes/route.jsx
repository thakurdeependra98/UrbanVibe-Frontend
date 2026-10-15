import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Account from "../componets/Profile";
import LoginPage from "../pages/Login";
import Header from "../componets/Header";
// import Admin from "../componets/users/Admin";
import PrivateRoute from "./PrivateRoutes";
import Checkout from "../componets/Checkout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Layout from "../pages/Layout";
import SellerDashboard from "../pages/Seller/SellerDashboard";
import SellerProducts from "../pages/Seller/SellerProducts";
import CreateProducts from "../pages/Seller/CreateProducts";

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

const BuyerHeader = () => {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/admin");

  return isDashboardRoute ? null : <Header />;
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <BuyerHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:category" element={<Products />}></Route>
          <Route
            path="/products/product/:id"
            element={<ProductDetails />}
          ></Route>
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          {/* <Route
            path="/buyer"
            element={
              <PrivateRoute role="buyer">
                <Buyer />
              </PrivateRoute>
            }
          ></Route> */}
          <Route
            path="/seller"
            element={
              <PrivateRoute role="seller">
                <Layout role="seller" />
              </PrivateRoute>
            }
          >
            <Route index element={<SellerDashboard />} />
          </Route>
          <Route
            path="/seller/products"
            element={
              <PrivateRoute role="seller">
                <Layout role="seller" />
              </PrivateRoute>
            }
            >
              <Route index element={<SellerProducts />} />
            </Route>
          <Route
            path="/seller/products/add"
            element={
              <PrivateRoute role="seller">
                <Layout role="seller" />
              </PrivateRoute>
            }
            >
              <Route index element={<CreateProducts />} />
            </Route>
          {/* <Route
            path="/admin/*"
            element={
              <PrivateRoute role="admin">
                <Admin />
              </PrivateRoute>
            }
          /> */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
