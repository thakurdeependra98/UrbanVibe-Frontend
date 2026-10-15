import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import logo from "../assests/UrbanVibe Logo.png";
import SearchBar from "./Search";
import { clearAuthSession, getAuthSession } from "../services/auth";
import { useGetProfile } from "../hooks/User/useQueries";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const session = getAuthSession();
  const user = session?.user;
  const token = session?.token;
  const isAuthenticated = Boolean(user && token);

    const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useGetProfile();
  console.log("Profile Data:", profileData?.cartItems.length);
  const cartItemCount = profileData?.cartItems?.length || 0;
  const wishlistItemCount = profileData?.wishlistItems?.length || 0;


  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
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
        {isAuthenticated && <span className="text-sm font-medium text-primary tracking-wider">Hello, {user.username}</span>}
      </div>
        <Link to="/wishlist" className="text-xl text-primary hover:text-primary/90" aria-label="Wishlist"><div className="relative">
          <IoMdHeart />
          {wishlistItemCount > 0 && (
            <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {wishlistItemCount}
            </span>
          )}
        </div></Link>
        <Link to="/cart" className="text-xl text-primary hover:text-primary/90" aria-label="Cart">
        <div className="relative"><IoCart />
        {!isProfileLoading && !isProfileError && cartItemCount > 0 && (
          <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cartItemCount}
        </span>
        )}
        </div></Link>
        {isAuthenticated ? (
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/90"
              aria-label="Open user menu"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <FaUser />
            </button>
            {isUserMenuOpen && (
              <div
                className="absolute -right-10 top-full z-50 mt-3 w-64 rounded-md border border-[#d8d3cb] bg-white p-4 shadow-lg"
                role="menu"
              >
                <div className="border-b border-[#e8e3dc] pb-3">
                  <p className="font-semibold text-primary">{user.username}</p>
                  {user.email && <p className="truncate text-sm text-secondary">{user.email}</p>}
                </div>
                <Link
                  to="/account"
                  className="block rounded px-2 py-2 text-sm text-gray-700 hover:bg-[#f7f3ee] hover:text-primary/90"
                  role="menuitem"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-[#f7f3ee] hover:text-primary/90"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-sm text-primary hover:text-primary/90">
            <FaUser />
            <span className="hidden sm:inline text-primary">Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
