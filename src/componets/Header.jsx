import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import logo from "../assests/UrbanVibe Logo.png";
import SearchBar from "./Search";
import { clearAuthSession, getAuthSession } from "../services/auth";

const Header = () => {
  const navigate = useNavigate();
  useLocation();
  const session = getAuthSession();
  const user = session?.user;

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <nav className="flex w-full items-center justify-between border-b border-[#d8d3cb] bg-white px-6 py-2 sm:px-12 lg:px-20">
      <Link to="/">
        <img className="h-10 w-auto object-contain sm:h-16" src={logo} alt="UrbanVibe" />
      </Link>
      <SearchBar />
      <div className="flex items-center gap-4 sm:gap-6">
      <div>
        {user && <span className="text-sm font-medium text-secondary">Hello, {user.username}</span>}
      </div>
        <Link to="/wishlist" className="text-xl hover:text-[#bb4d32]" aria-label="Wishlist"><IoMdHeart /></Link>
        <Link to="/cart" className="text-xl hover:text-[#bb4d32]" aria-label="Cart"><IoCart /></Link>
        {user ? (
          <button type="button" onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-[#bb4d32]">
            <FaUser />
            {/* <span className="hidden sm:inline">Logout</span> */}
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-sm hover:text-[#bb4d32]">
            <FaUser />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
