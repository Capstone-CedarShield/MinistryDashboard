import { useState } from "react";

function UrgencyInput({ urgencyLevel, setUrgencyLevel }) {

    
  return (
    <>
        <style>
            {`
            .urgency-container {
                display: flex;
                border-radius: 16px; /* Apply consistent border-radius */
                overflow: hidden;
                background-color: #f3f4f6; /* Light gray background */
            }
            .urgency-button {
                font-weight: 400; /* Slightly thicker font */
                color: black; /* Text color remains black */
                flex: 1; /* Equal width for buttons */
                text-align: center;
                background-color: transparent; /* Transparent background for unselected buttons */
                padding: 16px;
                border: none; /* Remove button borders */
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .urgency-button.selected {
                background-color: #ffe5e5; /* Light red background for selected state */
                color: black; /* Text color remains black */
                border-radius: 16px; /* Border radius for the selected button */
            }
            `}
            </style>
            <div className="mb-6">
            <label className="block text-lg font-normal text-gray-600 mb-2">
            Urgency Level
            </label>
            <div className="urgency-container">
            {["Low", "Moderate", "Urgent"].map((level) => (
                <button
                key={level}
                className={`urgency-button ${
                    urgencyLevel === level ? "selected" : ""
                }`}
                 onClick={() => setUrgencyLevel(level)}
                >
                {level}
                </button>
            ))}
            </div>
        </div>
       </>

  );
}

export default UrgencyInput;