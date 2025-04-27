import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationItem from "./OrganizationItem";
import SearchIcon from "../../../assets/icons/search-icon.svg";
import { getOrganization } from "../../../services/organizationServices";

const Organizations = () => {
  const [fetchedOrganizations, setFetchedOrganizations] = useState([]);
  const [displayedOrganizations, setDisplayedOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch organizations from backend
  const fetchOrganizations = async () => {
    try {
      const organizations = await getOrganization();

      setFetchedOrganizations(organizations);
      setDisplayedOrganizations(organizations);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Filter organizations based on search term
  const filterOrganizations = (term) => {
    if (!term) {
      setDisplayedOrganizations(fetchedOrganizations);
    } else {
      const filtered = fetchedOrganizations.filter((org) =>
        org.name.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayedOrganizations(filtered);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterOrganizations(e.target.value);
  };

  // Navigate to organization details page
  const handleDetails = (id) => {
    navigate(`/dashboard/organization/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Organizations</h1>
      </div>

      <div className="relative w-3/5">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Use the imported SearchIcon image */}
        <img
          src={SearchIcon}
          alt="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 "
        />
      </div>

      <div className="space-y-4">
        {displayedOrganizations.length > 0 ? (
          displayedOrganizations.map((org) => (
            <OrganizationItem
              key={org.id}
              organization={org}
              onDetails={() => handleDetails(org.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No organizations found.</p>
        )}
      </div>
    </div>
  );
};

export default Organizations;
