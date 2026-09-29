import React from "react";
import logo from "../assests/UrbanVibe Logo.png";
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import SearchBar from "./Search";

const Header = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const { cart, wishlist } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-20 py-6">
        <Link to="/">
          <img className="h-[6vw]" src={logo} alt="" />
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-lg tracking-wider hover:text-[red]">Sale</h1>
          </Link>
          <Link to="/buyer">
            <h1 className="text-lg tracking-wider hover:text-[red]">New Arrivals</h1>
          </Link>
          <Link to="/seller">
            <h1 className="text-lg tracking-wider hover:text-[red]">Men</h1>
          </Link>
          <Link to="/admin">
            <h1 className="text-lg tracking-wider hover:text-[red]">Women</h1>
          </Link>
          <Link to="/admin">
            <h1 className="text-lg tracking-wider hover:text-[red]">kids</h1>
          </Link>
        </div>
          <SearchBar />
        <div className="flex gap-8 items-center">
          {user && user.role === "buyer" ? (
            <div className="flex gap-8">
              <Link to="/wishlist">
                <h4 className="flex items-center gap-2 text-[1.2vw] font-normal hover:text-[#4f4f4f] relative">
                  Wishlist{" "}
                  {wishlist.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-4 -right-4">
                      {wishlist.length}
                    </span>
                  )}{" "}
                </h4>
              </Link>
              <Link to="/cart">
                <h4 className="flex items-center gap-2 text-[1.2vw] font-normal hover:text-[#4f4f4f] relative">
                  Cart{" "}
                  {cart.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-4 -right-4">
                      {cart.length}
                    </span>
                  )}{" "}
                </h4>
              </Link>
            </div>
          ) : user && user.role === "seller" ? (
            <div className="flex gap-8">
              <Link to="/seller">
                <h4 className="flex items-center gap-2 text-[1.2vw] font-normal hover:text-[#4f4f4f] px-3 py-1 rounded relative">
                  {" "}
                  <FaUserLarge /> Profile{" "}
                </h4>
              </Link>
            </div>
          ) : user && user.role === "admin" ? (
            <div className="flex gap-8">
              <Link to="/admin">
                <h4 className="flex items-center gap-2 text-[1.2vw] font-normal hover:text-[#4f4f4f] px-3 py-1 rounded relative">
                  {" "}
                  <FaUserLarge /> Profile{" "}
                </h4>
              </Link>
            </div>
          ) : !user ? (
            <div className="flex gap-4">
              <Link to="/wishlist">
                <h4 className="flex items-center gap-2 text-[1.8vw] font-normal hover:text-[#2e2e2e]">
                  <IoMdHeart />
                </h4>
              </Link>
              <Link to="/cart">
                <h4 className="flex items-center gap-2 text-[1.8vw] font-normal hover:text-[#2e2e2e]">
                  <IoCart />
                </h4>
              </Link>
            </div>
          ) : (
            ""
          )}
          {!isAuthenticated && !token ? (
            <Link to="/login">
              <h4 className="flex items-center text-[1.4vw] font-normal hover:text-[#2e2e2e]">
                <FaUser />
              </h4>
            </Link>
          ) : (
            <Link to="/">
              <h4
                onClick={handleLogout}
                className="flex items-center gap-2 text-[1.2vw] text-white font-normal hover:text-[#f1f1f1] bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </h4>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
