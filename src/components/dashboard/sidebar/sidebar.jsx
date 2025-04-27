import React, { useState } from "react";
import SidebarItem from "./sidebarItem";
import BackArrow from "../../../assets/icons/BackArrow.svg"; // Back arrow icon SVG
import IncidentIcon from "../../../assets/icons/IncidentIcon.svg"; // Incident icon SVG
import DisastersIcon from "../../../assets/icons/DisasterIcon.svg"; // Disasters icon SVG
import OrganizationIcon from "../../../assets/icons/OrganizationsIcon.svg"; // Organization icon SVG
import SettingsIcon from "../../../assets/icons/SettingsIcon.svg"; // Settings icon SVG
import CloseIcon from "../../../assets/icons/open-icon.svg"; // Close icon SVG
import OpenIcon from "../../../assets/icons/open-icon.svg"; // Open icon SVG
import LogoutIcon from "../../../assets/icons/logout-icon.svg"; // Logout icon SVG
import { logout } from "../../../firebase/auth"; // Import logout function

const routes = [
  { path: "incident", name: "Incidents", icon: IncidentIcon },
  { path: "disasters", name: "Disasters", icon: DisastersIcon },
  { path: "organization", name: "Organizations", icon: OrganizationIcon },
  { path: "settings", name: "Settings", icon: SettingsIcon },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePath, setActivePath] = useState(routes[0].path);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-screen flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-64 md:w-80" : "w-16"
      } bg-transparent`}
      style={{
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px) brightness(1.2)",
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.15) 10%, rgba(255, 255, 255, 0.5) 50%), 
                         radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 15%, rgba(255, 255, 255, 0.5) 40%)`,
      }}
    >
      <div>
        <div
          className={`flex justify-end p-4 ${isOpen ? "" : "bg-transparent"}`}
        >
          <button
            onClick={toggleSidebar}
            className="text-black text-2xl focus:outline-none"
            style={{ background: "none", border: "none" }}
          >
            {isOpen ? (
              <img src={BackArrow} alt="Close Sidebar" className="h-6 w-6" />
            ) : (
              <img src={OpenIcon} alt="Open Sidebar" className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* User Info Section */}
        {isOpen && (
          <div className="flex items-center mb-8 px-6">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center mr-4">
              <span role="img" aria-label="user-icon" className="text-xl">
                👤
              </span>
            </div>
            <div>
              <p className="text-xl font-semibold text-black">Ministry</p>
              <p className="text-sm text-gray-500">Employee</p>
            </div>
          </div>
        )}

        {/* Sidebar Menu */}
        <div className={`flex flex-col px-2 md:px-6 ${isOpen ? "" : "hidden"}`}>
          {routes.map((route, index) => (
            <SidebarItem
              key={index}
              route={route}
              isActive={activePath === route.path}
              onClick={() => setActivePath(route.path)}
            />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      {isOpen && (
        <div className="px-6 pb-6">
          <button
            onClick={logout}
            className="flex items-center w-full text-black text-base font-medium hover:bg-gray-100 p-4 rounded-lg transition-all duration-200"
          >
            <img src={LogoutIcon} alt="Logout Icon" className="h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
