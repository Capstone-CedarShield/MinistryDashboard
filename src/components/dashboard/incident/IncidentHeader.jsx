import React from "react";
import envelopeIcon from "../../../assets/icons/envelope-icon.svg";
import phoneIcon from "../../../assets/icons/phone-icon.svg";
import organizationIcon from "../../../assets/icons/redCross-icon.svg";
import { getIncidentIcon } from "./incidentIcon.js";
import { getSeverityColor } from "./colorSet.js";

const IncidentHeader = ({ incident }) => {
  const icon = getIncidentIcon(incident.type);
  const severityColor = getSeverityColor(incident.urgencyLevel);
  return (
    <div className="flex items-center justify-between w-full p-6">
      {/* Left and Center Section Combined */}
      <div className="flex items-center space-x-6">
        {/* Incident Icon */}
        <img
          src={icon}
          alt={incident.type}
          className="w-20 h-20 object-contain mr-2"
        />
        {/* Incident Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{incident.type}</h1>
          <p className="text-lg text-gray-500">{incident.location}</p>
        </div>
        {/* Center Section */}
        <div className="flex items-center space-x-4 ml-6">
          <span
            className="px-4 py-2 text-lg font-medium rounded-xl"
            style={{
              backgroundColor: `${severityColor}15`,
              color: severityColor,
            }}
          >
            {incident.urgencyLevel}
          </span>
          <span className="text-lg text-gray-500">
            {incident.isVerified ? "Verified" : "Not Verified."}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center text-red-500 space-y-2">
        <div className="text-center">
          <p className="text-sm text-gray-500">Alerted by:</p>
          <p className="text-sm font-medium">{incident.userEmail}</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 border border-red-200 rounded-md hover:bg-red-50 transition">
            <img
              src={phoneIcon}
              alt="Phone"
              className="w-6 h-6 object-contain" // Smaller image size
            />
          </button>
          <button className="p-2 border border-red-200 rounded-md hover:bg-red-50 transition">
            <img
              src={envelopeIcon}
              alt="Email"
              className="w-6 h-6 object-contain" // Smaller image size
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentHeader;
