import React, { useState, useEffect } from "react";
import IncidentItem from "./IncidentItem";
import { getIncidents } from "../../../services/incidentServices";

function Incident() {
  const statuses = ["All", "Most Urgent", "Today", "Verified", "Not Verified"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fetchedIncidents, setFetchedIncidents] = useState([]);
  const [displayedIncidents, setDisplayedIncidents] = useState([]);

  const localIncidents = (type) => {
    if (type === "All" || type === "") {
      setDisplayedIncidents(fetchedIncidents);
    } else if (type === "Most Urgent") {
      // Get the start of today (midnight) and end of today (11:59:59)
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      // Filter incidents that occurred today
      const todayIncidents = fetchedIncidents.filter((incident) => {
        const incidentDate = new Date(incident.createdAt); // Assuming incidents have a timestamp field
        return incidentDate >= startOfToday && incidentDate <= endOfToday;
      });

      // Filter the most urgent incidents for today
      const severityOrder = { Urgent: 3, Moderate: 2, Low: 1 };
      const sortedIncidents = [...todayIncidents].sort(
        (a, b) =>
          (severityOrder[b.urgencyLevel] || 0) -
          (severityOrder[a.urgencyLevel] || 0)
      );
      setDisplayedIncidents(sortedIncidents);
    } else if (type === "Verified") {
      const verified = fetchedIncidents.filter(
        (incident) => incident.isVerified === true
      );
      setDisplayedIncidents(verified);
    } else if (type === "Not Verified") {
      const notVerified = fetchedIncidents.filter(
        (incident) => incident.isVerified === false
      );
      setDisplayedIncidents(notVerified);
    } else if (type === "Today") {
      // Get the start of today (midnight) and end of today (11:59:59)
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      // Filter incidents that occurred today
      const todayIncidents = fetchedIncidents.filter((incident) => {
        const incidentDate = new Date(incident.createdAt); // Assuming incidents have a timestamp field
        return incidentDate >= startOfToday && incidentDate <= endOfToday;
      });
      setDisplayedIncidents(todayIncidents);
    } else {
      setDisplayedIncidents([]);
    }
  };

  const fetchIncidents = async () => {
    const incidents = await getIncidents();
    setFetchedIncidents(incidents);
    setDisplayedIncidents(incidents);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleButtonClick = (index, type) => {
    setSelectedIndex(index);
    localIncidents(type);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-white-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Urgent Alerts</h2>

      {/* Status Buttons */}
      <div className="flex items-center space-x-6 mb-6">
        {statuses.map((item, i) => (
          <button
            key={i}
            className={`px-5 py-3 rounded-full text-base font-semibold ${
              selectedIndex === i
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleButtonClick(i, item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Incident List */}
      <div className="space-y-6">
        {displayedIncidents.length > 0 ? (
          displayedIncidents.map((incident) => (
            <IncidentItem
              key={incident.id}
              id={incident.uuid}
              title={incident.type}
              location={incident.location}
              time={incident.createdAt}
              severity={incident.urgencyLevel}
            />
          ))
        ) : (
          <p>No incidents found.</p>
        )}
      </div>
    </div>
  );
}

export default Incident;
