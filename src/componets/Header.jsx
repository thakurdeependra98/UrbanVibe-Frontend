// import React from "react";
// import logo from "../assests/UrbanVibe Logo.png";
// import { FaUserLarge } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import { IoCart } from "react-icons/io5";
// import { IoMdHeart } from "react-icons/io";
// import { FaUser } from "react-icons/fa6";
// import SearchBar from "./Search";

// const Header = () => {

//   return (
//     <>
//       <nav className="w-full flex items-center justify-between px-20 py-2 border border-b-border bg-white">
//         <Link to="/">
//           <img className="h-10 w-auto object-contain sm:h-16" src={logo} alt="UrbanVibe" />
//         </Link>
//         <div className="hidden items-center gap-6 lg:flex">
//           <Link to="/">
//             <h1 className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-[#bb4d32]">Sale</h1>
//           </Link>
//           <Link to="/buyer">
//             <h1 className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-[#bb4d32]">New Arrivals</h1>
//           </Link>
//           <Link to="/seller">
//             <h1 className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-[#bb4d32]">Men</h1>
//           </Link>
//           <Link to="/admin">
//             <h1 className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-[#bb4d32]">Women</h1>
//           </Link>
//           <Link to="/admin">
//             <h1 className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-[#bb4d32]">Kids</h1>
//           </Link>
//         </div>
//           <SearchBar />
//         <div className="flex items-center gap-4 sm:gap-6">
//           {user && user.role === "buyer" ? (
//             <div className="flex gap-8">
//               <Link to="/wishlist">
//                 <h4 className="relative flex items-center gap-2 text-sm font-normal hover:text-[#4f4f4f]">
//                   Wishlist{" "}
//                   {wishlist.length > 0 && (
//                     <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-4 -right-4">
//                       {wishlist.length}
//                     </span>
//                   )}{" "}
//                 </h4>
//               </Link>
//               <Link to="/cart">
//                 <h4 className="relative flex items-center gap-2 text-sm font-normal hover:text-[#4f4f4f]">
//                   Cart{" "}
//                   {cart.length > 0 && (
//                     <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-4 -right-4">
//                       {cart.length}
//                     </span>
//                   )}{" "}
//                 </h4>
//               </Link>
//             </div>
//           ) : user && user.role === "seller" ? (
//             <div className="flex gap-8">
//               <Link to="/seller">
//                 <h4 className="relative flex items-center gap-2 rounded px-3 py-1 text-sm font-normal hover:text-[#4f4f4f]">
//                   {" "}
//                   <FaUserLarge /> Profile{" "}
//                 </h4>
//               </Link>
//             </div>
//           ) : user && user.role === "admin" ? (
//             <div className="flex gap-8">
//               <Link to="/admin">
//                 <h4 className="relative flex items-center gap-2 rounded px-3 py-1 text-sm font-normal hover:text-[#4f4f4f]">
//                   {" "}
//                   <FaUserLarge /> Profile{" "}
//                 </h4>
//               </Link>
//             </div>
//           ) : !user ? (
//             <div className="flex gap-4">
//               <Link to="/wishlist">
//                 <h4 className="flex items-center gap-2 text-xl font-normal hover:text-[#bb4d32]">
//                   <IoMdHeart />
//                 </h4>
//               </Link>
//               <Link to="/cart">
//                 <h4 className="flex items-center gap-2 text-xl font-normal hover:text-[#bb4d32]">
//                   <IoCart />
//                 </h4>
//               </Link>
//             </div>
//           ) : (
//             ""
//           )}
//           {!isAuthenticated && !token ? (
//             <Link to="/login">
//               <h4 className="flex items-center text-lg font-normal hover:text-[#bb4d32]">
//                 <FaUser />
//               </h4>
//             </Link>
//           ) : (
//             <Link to="/">
//               <h4
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 rounded bg-[#bb4d32] px-3 py-2 text-xs font-normal uppercase tracking-[0.12em] text-white hover:bg-[#1b1c1b]"
//               >
//                 Logout
//               </h4>
//             </Link>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;
