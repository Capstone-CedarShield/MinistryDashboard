import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import IncidentHeader from "./IncidentHeader";
import Map from "../../../pages/Maps";
import Modal from "../../shared/modal/Modal";
import UrgencyInput from "../../shared/input/UrgencyInput";
import InputField from "../../shared/input/InputField";
import uploadIcon from "../../../assets/icons/upload-icon.svg";
import SearchIcon from "../../../assets/icons/search-icon.svg";
import Button from "../../shared/button/Button";
import io from "socket.io-client";
import apiClient from "../../../config/axiosInstance";

const socket = io("http://localhost:3000");

function IncidentAssignment() {
  const { incidentId } = useParams();
  const location = useLocation();
  const incident = location.state?.incident;

  const [urgencyLevel, setUrgencyLevel] = useState(incident.urgencyLevel);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganizations, setSelectedOrganizations] = useState([
    "Lebanese Red Cross",
    "Lebanese Civil Defense",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mapping organization names to emails
  const organizationEmails = {
    "Lebanese Red Cross": "redcross@gmail.com",
    "Lebanese Civil Defense": "civildefense@gmail.com",
    "Doctors Without Borders": "dwb@example.com",
    "Lebanese Armed Forces": "armedforces@example.com",
    "Internal Security Forces": "internalsecurity@gmail.com",
  };

  // List of all organizations
  const allOrganizations = [
    "Lebanese Red Cross",
    "Lebanese Civil Defense",
    "Doctors Without Borders",
    "Lebanese Armed Forces",
    "Internal Security Forces",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrganizations = allOrganizations.filter((org) =>
    org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOrganization = (org) => {
    setSelectedOrganizations((prev) =>
      prev.includes(org) ? prev.filter((item) => item !== org) : [...prev, org]
    );
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const resetForm = () => {
    setUrgencyLevel(incident.urgencyLevel);
    setFiles([]);
    setDescription("");
    setSelectedOrganizations([
      "Lebanese Red Cross",
      "Lebanese Civil Defense",
    ]);
  };

  const handleAssignIncident = () => {
    setIsSubmitting(true);
    
    // Map each selected organization to include its email
    const assignedOrganizationsWithEmails = selectedOrganizations.map(
      (org) => ({
        name: org,
        email: organizationEmails[org] || "", // Fallback to empty string if email is missing
      })
    );

    const incidentData = {
      ...incident,
      urgencyLevel,
      files,
      description,
      assignedOrganizations: assignedOrganizationsWithEmails,
    };

    socket.emit("assign", incidentData);
    apiClient
      .put(`api/incidents/update/${incidentId}`, incidentData)
      .then((res) => {
        console.log(res.data);
        setIsSubmitting(false);
        setShowSuccess(true);
        resetForm();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error assigning incident:", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="relative flex flex-col w-full h-full p-6">
      <IncidentHeader incident={incident} />
      <div className="flex flex-1 gap-6">
        {/* Left Panel */}
        <div className="flex flex-col flex-[0.47] gap-4 p-4 border rounded-3xl bg-white-50 shadow-sm">
          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Incident has been successfully assigned!</span>
            </div>
          )}
          
          {/* Assign to Organizations */}
          <h2 className="text-lg font-semibold text-gray-700">
            Assign to Organization(s)
          </h2>
          <div className="flex flex-wrap gap-2 bg-gray-100 p-3 rounded-2xl">
            {selectedOrganizations.map((org) => (
              <span
                key={org}
                className="bg-red-700 text-white px-3 py-1.5 rounded-full text-base font-normal flex items-center justify-center flex-shrink-0"
              >
                {org}
              </span>
            ))}
            <button
              className="border border-gray-400 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-200"
              onClick={() => setIsModalOpen(true)}
            >
              +
            </button>
          </div>

          {/* Urgency Level */}
          <UrgencyInput
            urgencyLevel={urgencyLevel}
            setUrgencyLevel={setUrgencyLevel}
          />

          {/* Incident Content */}
          {/* <h2 className="text-lg font-semibold text-gray-700">
            Incident Content
          </h2> */}
          <style>
            {`
            .dashed-border {
              border: 2px dashed #d1d5db;
              padding: 24px;
              border-radius: 1rem;
              background-color: #f3f4f6;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              position: relative;
              transition: border-color 0.3s ease;
            }
            .file-name {
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }
            .file-name span {
              font-size: 14px;
              color: #4a4a4a;
            }
            .remove-file {
              cursor: pointer;
              color: red;
              font-size: 16px;
            }
            .file-list {
              margin-top: 10px;
              width: 100%;
              list-style-type: none;
              padding: 0;
            }
            .file-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 5px;
              background-color: #e0e0e0;
              margin-bottom: 5px;
              border-radius: 8px;
            }
          `}
          </style>

          {/* <div className="dashed-border p-6 rounded-xl shadow-sm bg-gray-100 flex flex-col justify-center items-center cursor-pointer hover:border-red-700">
            {/* <img src={uploadIcon} alt="Upload Icon" className="mb-2" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              multiple
            />
            <label
              htmlFor="file-upload"
              className="text-gray-500 text-sm cursor-pointer"
            >
              Upload
            </label> */}

          {/* Show the list of files */}
          {/* {files.length > 0 && (
              <ul className="file-list">
                {files.map((file) => (
                  <li key={file.name} className="file-item">
                    <span>{file.name}</span>
                    <span
                      className="remove-file"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          {/* Incident Description */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Incident Description/Safety Information
            </label>
            <InputField
              multiline
              rows={4}
              placeholder="Write additional information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Assign Incident Button */}
          <Button 
            onClick={handleAssignIncident} 
            className="mb-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Incident"}
          </Button>
        </div>

        {/* Map Section */}
        <div className="absolute right-0 w-[50%] h-full rounded-lg overflow-hidden shadow-md">
          <Map incidentLocation={incident.location} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <style>
            {`
            .custom-checkbox {
              width: 1.25rem;
              height: 1.25rem;
              border-radius: 0.375rem;
              border: 2px solid #ddd;
              transition: all 0.3s ease;
              transform: rotate(45deg);
              display: inline-block;
              cursor: pointer;
              position: relative;
            }
            .custom-checkbox.checked {
              background-color: #b91c1c;
              border-color: #b91c1c;
            }
            .custom-checkbox:not(.checked):hover {
              border-color: #b91c1c;
            }
          `}
          </style>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Organizations"
              className="w-full bg-gray-100 text-gray-500 p-4 pl-12 rounded-2xl shadow-md focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>

          <div className="flex flex-col gap-4">
            {filteredOrganizations.map((org) => (
              <div
                key={org}
                onClick={() => toggleOrganization(org)}
                className={`flex items-center justify-start p-3 rounded-2xl cursor-pointer ${
                  selectedOrganizations.includes(org)
                    ? "bg-red-50"
                    : "bg-white"
                }`}
              >
                <div
                  onClick={() => toggleOrganization(org)}
                  className={`custom-checkbox ${
                    selectedOrganizations.includes(org) ? "checked" : ""
                  } mr-4`}
                />
                <span
                  className={`text-xl ${
                    selectedOrganizations.includes(org)
                      ? "font-medium text-red-700"
                      : "font-medium text-gray-600"
                  } py-1`}
                >
                  {org}
                </span>
              </div>
            ))}
          </div>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => setIsModalOpen(false)}
          >
            Done
          </button>
        </Modal>
      )}
    </div>
  );
}

export default IncidentAssignment;
