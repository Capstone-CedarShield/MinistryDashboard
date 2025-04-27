import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Modal from "../components/shared/modal/Modal";

const socket = io("http://localhost:3000");

const TestSocket = () => {
  const [incidents, setIncidents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newIncident, setNewIncident] = useState(null);

  useEffect(() => {
    socket.on("newIncident", (incident) => {
      setNewIncident(incident);
      setShowModal(true);
      setIncidents((prevIncidents) => [...prevIncidents, incident]);
    });

    return () => {
      socket.off("newIncident");
    };
  }, []);

  return (
    <div>
      <h1>Test</h1>
      {incidents.map((incident, index) => (
        <div key={index}>
          <h3>{incident.incidentType}</h3>
          <p>{incident.incidentDescription}</p>
        </div>
      ))}

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h2>New Incident Reported</h2>
          <p>
            <strong>Type:</strong> {newIncident.incidentType}
          </p>
          <p>
            <strong>Description:</strong> {newIncident.incidentDescription}
          </p>
          <div>
            {newIncident.images?.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000/${image}`} // Assuming the server serves files from 'uploads' folder
                alt={`Incident image ${index}`}
                style={{ width: "100px", margin: "5px" }}
              />
            ))}
          </div>
          <button onClick={() => setShowModal(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default TestSocket;
