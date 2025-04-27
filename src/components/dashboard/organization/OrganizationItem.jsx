import React from "react";
import getOrganizationIcon from "./organizationIcons"; // Import function

const OrganizationItem = ({ organization, onDetails }) => {
  const { name, organization_key } = organization;
  const icon = getOrganizationIcon(organization_key); // Get the correct icon

  return (
    <div className="relative flex items-center justify-between p-6 bg-white border rounded-xl shadow-md hover:shadow transition-all duration-300">
      <div className="flex items-center">
        <img
          src={icon}
          alt={name}
          className="w-16 h-16 rounded-full mr-6 object-contain"
        />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-md text-gray-500 mt-1">
            Organization Key: {organization_key}
          </p>
        </div>
      </div>
      <button
        className="text-gray-500 hover:text-gray-700 flex items-center"
        onClick={onDetails}
      >
        Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-1"
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
};

export default OrganizationItem;
