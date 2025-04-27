import React, { useState } from "react";
import UrgencyInput from "../../shared/input/UrgencyInput";
import InputField from "../../shared/input/InputField";
import Button from "../../shared/button/Button";
import apiClient from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function DisasterNotify() {
  const [incidentType, setIncidentType] = useState("Accident");
  const [urgencyLevel, setUrgencyLevel] = useState("Moderate");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    // Create previews for selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]); // Clean up memory
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleNotification = async () => {
    const incidentUuid = uuidv4();

    const formData = new FormData();
    formData.append("type", incidentType);
    formData.append("urgencyLevel", urgencyLevel);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("uuid", incidentUuid);
    formData.append("userEmail", "ministry@gmail.com");
    formData.append("isVerified", true); 
    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await apiClient.post("/api/incidents/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const response2 = await apiClient.post('/api/notifications/create', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      navigate(`/dashboard/incident/assign/${response.data.uuid}`, {
        state: { incident: response.data },
      });
    } catch (error) {
      console.error("Error creating incident:", error);
      alert("An error occurred while creating the incident.");
    }
  };

  return (
    <div className="relative bg-white p-8 shadow-lg rounded-lg">
      <style>
        {`
          .custom-input, .custom-button {
            border-radius: 16px;
          }
          .image-preview-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
          }
          .image-preview {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 8px;
            overflow: hidden;
          }
          .image-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .remove-image {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          /* Custom select styling */
          select.custom-input {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1em;
          }
          /* Focus state */
          select.custom-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.3);
            border-color: #b91c1c;
          }
          /* Option styling */
          select.custom-input option {
            background-color: white;
            color: #374151;
          }
          select.custom-input option:checked,
          select.custom-input option:hover {
            background-color: #fee2e2 !important;
            color: #b91c1c !important;
          }
        `}
      </style>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Disaster Notify</h2>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* Incident Type Selection */}
        <div className="mb-4">
          <label className="block text-lg font-normal text-gray-600 mb-2">
            Incident Type Selection
          </label>
          <select
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="custom-input w-full bg-gray-100 px-4 py-4 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
          >
            <option value="Accident">Accident</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Fire">Fire</option>
          </select>
        </div>

        {/* Urgency Level Input */}
        <UrgencyInput
          urgencyLevel={urgencyLevel}
          setUrgencyLevel={setUrgencyLevel}
        />

        {/* Incident Location */}
        <div className="mb-4">
          <label className="block text-lg font-normal text-gray-600 mb-2">
            Incident Location
          </label>
          <InputField
            type="text"
            placeholder="Enter location/Choose location on the map"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

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

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Upload Images (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full text-gray-700 bg-gray-100 rounded-lg p-2"
          />

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="image-preview-container">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Send Notification Button */}
        <Button onClick={handleNotification} className="custom-button">
          Send Notification
        </Button>
      </div>
    </div>
  );
}

export default DisasterNotify;
