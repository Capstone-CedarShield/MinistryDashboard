import React from "react";
import { Link } from "react-router-dom";
import SideBarArrow from "../../../assets/icons/SidebarArrow.svg"; 

function SidebarItem({ route, isActive, onClick }) {
  return (
    <Link
      to={route.path}
      className={`flex items-center p-4 mb-3 rounded-lg cursor-pointer ${
        isActive ? "bg-white" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? "white" : "transparent",
        borderRadius: "15px",
      }}
    >
      <img
        src={route.icon}
        alt={`${route.name} Icon`}
        className="w-6 h-6 mr-4"
      />
      <span
        className={`flex-grow text-lg ${
          isActive ? "text-black font-semibold" : "text-gray-700"
        }`}
        style={{
          fontSize: "16px", 
        }}
      >
        {route.name}
      </span>
      <span className={`ml-auto ${isActive ? "text-black" : "text-gray-400"}`}>
        <img src={SideBarArrow} alt="Arrow Icon" className="h-5 w-5" />
      </span>
    </Link>
  );
}

export default SidebarItem;
