import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Comparison",
    path: "/Comparison",
    icon: <FaIcons.FaBalanceScale />,
    cName: "nav-text",
  },
  
  {
    title: "Timeline",
    path: "/Timeline",
    icon: <FaIcons.FaClock />,
    cName: "nav-text",
  },
];