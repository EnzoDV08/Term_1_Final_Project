import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import logo from "../assets/Logo.png";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const location = useLocation();
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: "undefined" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={index} className={isActive ? "nav-text active" : "nav-text"}>
                    <Link to={item.path} className="nav-link">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="navbar-logo">
                <img src={logo} alt="Logo" />
              </li>
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
  export default Navbar;