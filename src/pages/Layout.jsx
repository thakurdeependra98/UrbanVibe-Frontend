import React from "react";
import { Outlet } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartLine,
  FaClipboardList,
  FaPlusCircle,
  FaTags,
  FaTachometerAlt,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { RxDashboard } from "react-icons/rx";

const menus = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: FaTachometerAlt },
    { label: "Products", path: "/admin/products", icon: FaBoxOpen },
    { label: "Categories", path: "/admin/categories", icon: FaTags },
    { label: "Sellers", path: "/admin/sellers", icon: FaUsers },
    { label: "Orders", path: "/admin/orders", icon: FaClipboardList },
    { label: "Users", path: "/admin/users", icon: FaUsers },
  ],

  seller: [
    { label: "Dashboard", path: "/seller", icon: RxDashboard },
    { label: "My Products", path: "/seller/products", icon: FaBoxOpen },
    { label: "Add Product", path: "/seller/products/add", icon: FaPlusCircle },
    { label: "Orders", path: "/seller/orders", icon: FaClipboardList },
    { label: "Earnings", path: "/seller/earnings", icon: FaWallet },
  ],
};

export default function Layout({ role }) {
  const menuItems = menus[role] ?? [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar menuItems={menuItems} />

      <div className="ml-64 min-w-0 flex-1">
        {/* <Header title={`${role.toUpperCase()} PANEL`} /> */}

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}