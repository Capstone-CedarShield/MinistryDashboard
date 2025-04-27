"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/dashboard/sidebar/sidebar.jsx"
import Navbar from "../components/dashboard/navbar/Navbar.jsx"
import Modal from "../components/shared/modal/Modal"
import io from "socket.io-client"
import Map from "./Map.jsx"
import { getTodayIncidents } from "../services/incidentServices"

// Initialize socket connection
const socket = io("http://localhost:3000")

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMap, setShowMap] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newIncident, setNewIncident] = useState(null)
  const [incidents, setIncidents] = useState([]) // Array to store today's incidents

  // Function to navigate to the specific incident page
  const goToIncident = (id) => {
    setShowModal(false)
    navigate(`/dashboard/incident/${id}`)
  }

  // Fetch today's incidents from the backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getTodayIncidents()
        setIncidents(data)
      } catch (error) {
        console.error("Error fetching incidents:", error)
      }
    }

    fetchIncidents()
  }, [])

  // Handle socket connection and listen for new incidents
  useEffect(() => {
    socket.on("newIncident", (incident) => {
      console.log("New incident reported: ", incident)
      setNewIncident(incident)
      setShowModal(true)
      // Add the new incident to the list of incidents
      setIncidents((prev) => [...prev, incident])
    })

    return () => {
      socket.off("newIncident")
    }
  }, [])

  // Adjust the map visibility based on the current route
  useEffect(() => {
    const baseRoutes = ["/dashboard/incident", "/dashboard/organization"]
    const shouldHideMap = baseRoutes.some((route) => location.pathname.startsWith(route) && location.pathname !== route)
    setShowMap(!shouldHideMap)
  }, [location])

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className={`flex flex-1 ${showMap ? "flex-row" : "flex-col"} overflow-hidden`}>
          {/* Main Content */}
          <div className={`flex-grow overflow-y-auto ${showMap ? "max-w-3xl" : "w-full"}`}>
            <Outlet />
          </div>

          {showMap && (
            <div
              className="h-full"
              style={{
                flexGrow: 1,
                minWidth: "300px",
                maxWidth: "calc(100vw - 800px)",
              }}
            >
              {/* Pass the entire incidents array to the Maps component */}
              <Map incidents={incidents} />
            </div>
          )}
        </div>
      </div>

      {/* Modal for new incident */}
      {showModal && newIncident && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="max-w-md p-10 px-14 bg-white rounded-lg shadow-xl w-full mx-auto">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">New Incident Reported</h2>

            {/* Type Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Type</h3>
              <div className="p-4 bg-gray-50 border-l-4 border-red-700 rounded-md">
                <p className="text-gray-600">{newIncident.incidentType}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
              <div className="p-4 bg-gray-50 border-l-4 border-red-700 rounded-md">
                <p className="text-gray-600">{newIncident.incidentDescription}</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Location</h3>
              <div className="p-4 bg-gray-50 border-l-4 border-red-700 rounded-md">
                <p className="text-gray-600">{newIncident.location}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Email</h3>
              <div className="p-4 bg-gray-50 border-l-4 border-red-700 rounded-md">
                <p className="text-gray-600">{newIncident.userEmail}</p>
              </div>
            </div>

            {/* Button Container */}
            <div className="flex justify-between gap-4 mt-10">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 border-2 border-red-700 text-red-700 font-semibold rounded-lg hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-700 transition duration-200"
              >
                Close
              </button>
              {/* Go to Incident Button */}
              <button
                onClick={() => goToIncident(newIncident.uuid)}
                className="w-full p-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 transition duration-200"
              >
                Go to Incident
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Dashboard
