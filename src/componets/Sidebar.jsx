import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assests/UrbanVibe Logo.png";

const Sidebar = ({ menuItems }) => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 overflow-hidden bg-white shadow-md border border-border">
      <div className="p-4">
        <Link to="/">
        <img className="h-10 w-auto object-contain sm:h-16 sm:px-2" src={logo} alt="UrbanVibe" />
      </Link>
        <ul className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/seller" ||
                     item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-primary/80 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>

      </div>
    </aside>
  );
};

export default Sidebar;