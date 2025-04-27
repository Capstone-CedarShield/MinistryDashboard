import React, { useState } from "react";
import Modal from "../../shared/modal/Modal";
import Button from "../../shared/button/Button";
import { verifyIncident } from "../../../services/incidentServices";
import { useParams, useNavigate } from "react-router-dom";

const IncidentVerification = ({ verified, onVerifyChange, incident }) => {
  const navigate = useNavigate();
  const { incidentId } = useParams();
  const [isVerified, setIsVerified] = useState(verified);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleVerify = async () => {
    try {
      await verifyIncident(incidentId);
      setIsVerified(true);
      onVerifyChange(true); // Notify the parent component
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to verify incident:", err);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-4 pt-10 pb-10 border border-gray-300 text-center">
        {!isVerified ? (
          <>
            <p className="text-gray-900 text-2xl font-normal mb-6 pb-2">
              To assign this incident, <br />
              first it should be <strong>verified</strong>.
            </p>
            <Button
              onClick={handleOpenModal}
              className="border-2 border-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 py-3 px-10 text-lg font-medium w-auto transition"
            >
              Verify Incident
            </Button>
          </>
        ) : (
          <>
            <p className="text-gray-900 text-2xl font-normal mb-6 pb-2">
              The Incident is verified, <br /> <strong>Assign</strong> the
              Incident.
            </p>
            <Button
              onClick={() =>
                navigate(`/dashboard/incident/assign/${incidentId}`, {
                  state: { incident },
                })
              }
              className="border-2 border-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 py-3 px-12 w-auto text-lg font-medium transition"
            >
              Assign Incident
            </Button>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div className="p-2">
            <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-6">
              Verify Incident?
            </h2>
            <div className="flex justify-center gap-6 pt-4">
              <button
                onClick={handleVerify}
                className="bg-green-50 text-green-600 text-2xl font-medium py-7 px-12 rounded-lg shadow-md hover:bg-green-200 transition"
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-100 text-red-600 text-2xl font-medium py-7 px-12 rounded-lg shadow-md hover:bg-red-200 transition"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IncidentVerification;
