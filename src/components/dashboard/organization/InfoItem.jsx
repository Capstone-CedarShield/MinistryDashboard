import React from "react";
import EmergencyIcon from "../../../assets/icons/emergencyIcon.svg";
import PhoneIcon from "../../../assets/icons/phoneIcon.svg";
import WebsiteIcon from "../../../assets/icons/websiteIcon.svg";
import EmailIcon from "../../../assets/icons/emailIcon.svg";

const InfoItem = ({ placeholder, value, icon }) => {
  let iconSrc;
  // Assign the appropriate image based on the icon prop passed
  if (icon === "hotline") {
    iconSrc = EmergencyIcon; // Update this with your uploaded image path
  } else if (icon === "phone") {
    iconSrc = PhoneIcon; // Example for phone icon
  } else if (icon === "email") {
    iconSrc = EmailIcon; // Example for email icon
  } else if (icon === "website") {
    iconSrc = WebsiteIcon; // Example for website icon
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Icon with added padding */}
      <div className="p-2">
        {iconSrc && <img src={iconSrc} alt={icon} className="w-6 h-6" />}{" "}
        {/* Adjust size of the icon */}
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-lg text-gray-700">{value}</span>
      </div>
    </div>
  );
};

export default InfoItem;
