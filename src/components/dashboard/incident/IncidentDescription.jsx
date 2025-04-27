import React from "react";

const IncidentDescription = ({ description }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-10 border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-300 pb-4">
        Incident Description
      </h2>
      <div className="text-gray-600 text-xl leading-6 whitespace-pre-line pt-4 ">
        {description}
      </div>
    </div>
  );
};

export default IncidentDescription;
