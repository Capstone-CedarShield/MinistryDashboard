import React from "react";
import envelopeIcon from "../../../assets/icons/envelope-icon.svg";
import phoneIcon from "../../../assets/icons/phone-icon.svg";
import getOrganizationIcon from "./organizationIcons"; // Import dynamic icon function

const Header = ({ organization }) => {
  if (!organization) return <div>Loading...</div>;

  const orgIcon = getOrganizationIcon(organization.organization_key); // Get the correct icon

  return (
    <div className="flex items-center justify-between p-4 bg-white ">
      {/* Logo and Organization Info */}
      <div className="flex items-center">
        <img
          src={orgIcon || "/placeholder.png"} // Use the correct organization icon
          alt={organization.name}
          className="w-20 h-20 rounded-full object-contain mr-6"
        />
        <div>
          {/* Organization Name & Type Badge (Side by Side) */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{organization.name}</h1>
            <span className="bg-purple-100 text-purple-800 text-lg font-semibold px-5 py-1 rounded-xl ml-5">
              {organization.organizationType || "Unknown"}
            </span>
          </div>
          {/* Organization Location (Stays Below the Name) */}
          <p className="text-lg text-gray-500">
            {organization.location || "Location not available"}
          </p>
        </div>
      </div>

      {/* Contact Icons */}
      <div className="flex items-center space-x-2">
        {organization.email && (
          <a
            href={`mailto:${organization.email}`}
            className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
          >
            <img src={envelopeIcon} alt="Email" className="w-5 h-5 mx-auto" />
          </a>
        )}
        {organization.phoneNumber && (
          <a
            href={`tel:${organization.phoneNumber}`}
            className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
          >
            <img src={phoneIcon} alt="Phone" className="w-5 h-5 mx-auto" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
