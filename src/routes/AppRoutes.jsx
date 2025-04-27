import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext/index";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Organizations from "../components/dashboard/organization/Organizations";
import OrganizationDetails from "../components/dashboard/organization/OrganizationDetails";
import Incident from "../components/dashboard/incident/Incident";
import Disasters from "../components/dashboard/disaster/Disaster";
import ErrorPage from "../pages/ErrorPage";
import IncidentDetails from "../components/dashboard/incident/IncidentDetails";
import IncidentAssignemnt from "../components/dashboard/incident/IncidentAssignment";
import Settings from "../components/dashboard/settings/Settings";
import TestSocket from "../pages/testSocket";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/home" />;
};

const AppRoutes = () => {
  const organizations = [
    {
      id: 1,
      name: "Lebanese Red Cross (LRC)",
      email: "info@redcross.org.lb",
      phone: "+961-1-372802",
      hotline: "140",
      website: "www.redcross.org.lb",
      totalIncidents: 500,
      completed: 481,
      active: 19,
      address: "Spears Street, Beirut, Lebanon",
    },
    {
      id: 2,
      name: "Lebanese Red Cross (Branch 2)",
      email: "branch2@redcross.org.lb",
      phone: "+961-1-372803",
      hotline: "141",
      website: "www.redcross.org.lb",
      totalIncidents: 200,
      completed: 190,
      active: 10,
      address: "Hamra Street, Beirut, Lebanon",
    },
    {
      id: 3,
      name: "syria Red Cross (Branch 2)",
      email: "branch2@redcross.org.lb",
      phone: "+961-1-372803",
      hotline: "141",
      website: "www.redcross.org.lb",
      totalIncidents: 200,
      completed: 190,
      active: 10,
      address: "Hamra Street, Beirut, Lebanon",
    },
    {
      id: 4,
      name: "oman Red Cross (Branch 2)",
      email: "branch2@redcross.org.lb",
      phone: "+961-1-372803",
      hotline: "141",
      website: "www.redcross.org.lb",
      totalIncidents: 200,
      completed: 190,
      active: 10,
      address: "Hamra Street, Beirut, Lebanon",
    },
    {
      id: 5,
      name: "hasan Red Cross (Branch 2)",
      email: "branch2@redcross.org.lb",
      phone: "+961-1-372803",
      hotline: "141",
      website: "www.redcross.org.lb",
      totalIncidents: 200,
      completed: 190,
      active: 10,
      address: "Hamra Street, Beirut, Lebanon",
    },
    {
      id: 6,
      name: "anis Red Cross (Branch 2)",
      email: "branch2@redcross.org.lb",
      phone: "+961-1-372803",
      hotline: "141",
      website: "www.redcross.org.lb",
      totalIncidents: 200,
      completed: 190,
      active: 10,
      address: "Hamra Street, Beirut, Lebanon",
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        

        <Route
          path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="organization" element={<Organizations />} />
          <Route path="organization/:id"element={<OrganizationDetails organizations={organizations} />}/>
          <Route path="incident/assign/:incidentId" element={<IncidentAssignemnt />} />
          <Route path="incident" element={<Incident />} />
          <Route path="incident/:incidentId" element={<IncidentDetails />} />
          <Route path="disasters" element={<Disasters/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="test" element={<TestSocket />} />

        </Route>

        <Route path="*" element={<Navigate to="/error?code=404&message=Page Not Found" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
