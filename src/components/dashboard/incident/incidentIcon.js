// incidentIcon.js
import fireIcon from "../../../assets/incidentIcon/fireIcon.svg";
import roadAccidentIcon from "../../../assets/incidentIcon/roadAccident.svg";
import earthquakeIcon from "../../../assets/incidentIcon/earthquake.svg";
import floodIcon from "../../../assets/incidentIcon/flood.svg";
import gasLeakIcon from "../../../assets/incidentIcon/gasLeak.svg";
import tornadoIcon from "../../../assets/incidentIcon/tornado.svg";
import powerOutageIcon from "../../../assets/incidentIcon/powerOutage.svg";
import landslideIcon from "../../../assets/incidentIcon/landslide.svg";
import explosionIcon from "../../../assets/incidentIcon/explosion.svg";
import medicalEmergencyIcon from "../../../assets/incidentIcon/medicalEmergency.svg";
import theftIcon from "../../../assets/incidentIcon/theft.svg";

export const getIncidentIcon = (title) => {
  if (title.toLowerCase().includes("fire")) {
    return fireIcon;
  } else if (title.toLowerCase().includes("accident")) {
    return roadAccidentIcon;
  } else if (title.toLowerCase().includes("earthquake")) {
    return earthquakeIcon;
  } else if (title.toLowerCase().includes("flood")) {
    return floodIcon;
  } else if (title.toLowerCase().includes("gas leak")) {
    return gasLeakIcon;
  } else if (title.toLowerCase().includes("tornado")) {
    return tornadoIcon;
  } else if (title.toLowerCase().includes("power outage")) {
    return powerOutageIcon;
  } else if (title.toLowerCase().includes("landslide")) {
    return landslideIcon;
  } else if (title.toLowerCase().includes("explosion")) {
    return explosionIcon;
  } else if (title.toLowerCase().includes("medical emergency")) {
    return medicalEmergencyIcon;
  } else if (title.toLowerCase().includes("theft")) {
    return theftIcon;
  }
  return ""; // Return a default image or an empty string if no match
};
