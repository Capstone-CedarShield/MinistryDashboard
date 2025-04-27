import React from "react";
import IncidentIcon from "../../../assets/icons/totalIncidents-icon.svg";
import ActiveIcon from "../../../assets/icons/active-icon.svg";
import CompletedIcon from "../../../assets/icons/completed-icon.svg";

const IncidentReports = ({ organization }) => {
  console.log(organization);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      {/* Title Section */}
      <h3 className="font-bold text-2xl mb-6 text-black">Incident Reports</h3>

      {/* Total Incidents */}
      <div className="flex items-center justify-center mb-6">
        <img
          src={IncidentIcon}
          alt="Total Incidents Icon"
          className="w-10 h-10 mr-4"
        />
        <span className="text-gray-600 text-xl font-medium">
          {organization.completed + organization.active} Total Incidents
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-6" />

      {/* Status Section */}
      <div className="flex justify-around text-center gap-8">
        {/* Completed Section */}
        <div>
          <div className="flex items-center justify-center mb-2">
            <img
              src={CompletedIcon}
              alt="Completed Icon"
              className="w-8 h-8 mr-3"
            />
            <span className="text-gray-600 text-lg font-medium">Completed</span>
          </div>
          <p className="text-green-500 text-2xl font-bold">
            {organization.completed}
          </p>
        </div>

        {/* Active Section */}
        <div>
          <div className="flex items-center justify-center mb-2">
            <img src={ActiveIcon} alt="Active Icon" className="w-8 h-8 mr-3" />
            <span className="text-gray-600 text-lg font-medium">Active</span>
          </div>
          <p className="text-red-500 text-2xl font-bold">
            {organization.active}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentReports;
