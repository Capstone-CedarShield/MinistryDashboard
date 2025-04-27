import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to get the organization ID
import Header from "./OrganizationHeader";
import PersonalInfo from "./PersonalInfo";
import IncidentReport from "./IncidentReports";
import ChatBox from "./ChatBox";
import { getOrganizationByID } from "../../../services/organizationServices"; // Import the function to fetch organization by ID

const OrganizationDetails = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const [organization, setOrganization] = useState(null); // State to store the fetched organization data
  const navigate = useNavigate(); // Navigate to other pages

  // Fetch organization by ID
  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const fetchedOrganization = await getOrganizationByID(id);
        setOrganization(fetchedOrganization); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    fetchOrganizationDetails();
  }, [id]); // Re-run the effect if the ID changes

  // Redirect if no organization found
  if (!organization) {
    return <div>Loading...</div>; // Or you can show a "Not Found" message
  }

  return (
    <div className="p-6 space-y-6">
      <Header organization={organization} />
      <div className="flex">
        <div className="w-1/3 pr-4 pl-4">
          <PersonalInfo organization={organization} />
          <IncidentReport organization={organization} />
        </div>

        <div className="w-2/3">
          <ChatBox organization={organization} />
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
