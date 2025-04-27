import React from "react";
import { useNavigate } from "react-router-dom";
import { getSeverityColor } from "./colorSet.js";
import { getIncidentIcon } from "./incidentIcon.js";
import { formatTime } from "./formatTime.js";

function IncidentItem({ title, location, time, severity, id }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/dashboard/incident/${id}`); // ✅ Ensure `id` is the UUID
  };

  const icon = getIncidentIcon(title);

  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-6 w-1/3">
        <div className="flex items-center justify-center w-16 h-16 rounded-full">
          <img src={icon} alt={`${title} Icon`} className="w-12 h-12" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800">{title}</p>
          <p className="text-md text-gray-500">{location}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col items-start justify-between w-1/3">
        <span
          className="text-base font-medium"
          style={{ color: getSeverityColor(severity) }}
        >
          {severity}
        </span>
        <p className="text-md text-gray-400">{formatTime(time)}</p>
      </div>

      {/* Right Section: Button */}
      <button
        onClick={handleViewDetails}
        className="flex items-center text-gray-500 hover:text-gray-800"
      >
        <span className="text-md font-medium">View Details</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default IncidentItem;
