import React, { useState } from "react";
import { sendCustomPasswordResetEmail } from "../../../firebase/auth";
import SideBarArrow from "../../../assets/icons/SidebarArrow.svg";

function SettingsOption({ id }) {
  const [toggle, setToggle] = useState(false); // For notifications toggle
  const [language, setLanguage] = useState("English (US)"); // Selected language
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const languages = ["English (US)", "Arabic"]; // Available languages

  // Handle language selection
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleChangePassword = (email) => {
    sendCustomPasswordResetEmail(email);
  };

  return (
    <div className="p-4 flex items-center space-x-4">
      {/* Language Settings */}
      {id === 1 && (
        <div className="flex items-center justify-between w-full">
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ml-auto bg-transparent text-gray-700 text-base focus:outline-none flex items-center"
            >
              {language}
              <svg
                className={`w-6 h-6 ml-2 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        language === lang ? "font-medium bg-gray-100" : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications */}
      {id === 2 && (
        <div className="flex items-center justify-between w-full">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggle}
              onChange={() => setToggle((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-red-700 transition-colors flex items-center justify-center">
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  toggle ? "translate-x-2.5" : "-translate-x-2.5"
                }`}
              ></div>
            </div>
          </label>
        </div>
      )}

      {/* Change Password */}
      {id === 3 && (
        <div className="flex items-center justify-between w-full">
          <button onClick={() => handleChangePassword("alex.kheir@lau.edu")}>
            <img src={SideBarArrow} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsOption;
