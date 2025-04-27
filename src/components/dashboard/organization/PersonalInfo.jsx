import React from "react";
import InfoItem from "./InfoItem";

const PersonalInfo = ({ organization }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <div className="space-y-3">
        <InfoItem placeholder="Email" value={organization.email} icon="email" />
        <InfoItem
          placeholder="Phone"
          value={organization.phoneNumber}
          icon="phone"
        />
        <InfoItem
          placeholder="Hotline"
          value={`Emergency Hotline: ${organization.emergencyPhoneNumber}`}
          icon="hotline"
        />
        <InfoItem
          placeholder="Website"
          value={organization.website}
          icon="website"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
