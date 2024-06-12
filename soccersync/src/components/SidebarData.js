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
    path: "/comparison",
    icon: <FaIcons.FaBalanceScale />,
    cName: "nav-text",
  },
  {
    title: "Timeline",
    path: "/timeline",
    icon: <FaIcons.FaClock />,
    cName: "nav-text",
  },
];
