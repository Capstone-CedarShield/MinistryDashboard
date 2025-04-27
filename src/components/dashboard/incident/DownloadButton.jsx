import React from "react";
import Button from "../../shared/button/Button";

const DownloadZipButton = ({ incidentId }) => {
  const handleDownload = () => {
    // Update the URL if needed to match your backend configuration
    const url = `http://localhost:3000/api/incidents/${incidentId}/download`;
    const link = document.createElement("a");
    link.href = url;
    // The download attribute here triggers the browser's Save dialog
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      className="text-red-700 border-2 border-red-700 bg-white hover:bg-red-50 text-lg hover:text-white"
    >
      Download Incident Images as ZIP
    </Button>
  );
};

export default DownloadZipButton;
