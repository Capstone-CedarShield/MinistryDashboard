import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 33.8547,
  lng: 35.8623,
};
const lebanonBounds = {
  north: 34.8,
  south: 33.0,
  east: 36.6,
  west: 35.1,
};

const Map = ({ incidents }) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  // Geocode an address to get its latitude and longitude
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error("Error geocoding address:", error);
      return null;
    }
  };

  // When the incidents prop changes, geocode each incident’s location
  useEffect(() => {
    const updateMapWithLocations = async () => {
      if (Array.isArray(incidents)) {
        const markerPromises = incidents.map(async (incident) => {
          const coords = await geocodeAddress(incident.location);
          return coords ? { position: coords } : null;
        });
        const markersArray = (await Promise.all(markerPromises)).filter(
          (m) => m !== null
        );
        setMarkers(markersArray);
        // Removed panTo and setZoom: the map always shows the Lebanon bounds.
      } else if (incidents && typeof incidents === "string") {
        const coordinates = await geocodeAddress(incidents);
        if (coordinates) {
          setMarkers([{ position: coordinates }]);
          // Removed panTo and setZoom.
        }
      } else if (incidents && typeof incidents === "object") {
        // If a single coordinate object is provided
        setMarkers([{ position: incidents }]);
        // Removed panTo and setZoom.
      }
    };

    updateMapWithLocations();
  }, [incidents]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  const handleMapLoad = (map) => {
    mapRef.current = map;

    // Create a search input element
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search for a place";
    input.style.cssText = `
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 300px;
      font-size: 14px;
    `;
    inputRef.current = input;

    // Add the input to the map's controls
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Initialize Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setBounds(
      new google.maps.LatLngBounds(
        new google.maps.LatLng(lebanonBounds.south, lebanonBounds.west),
        new google.maps.LatLng(lebanonBounds.north, lebanonBounds.east)
      )
    );
    autocompleteRef.current = autocomplete;

    // Listen for place selection and update the markers without panning or zooming
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log("No details available for input: " + place.name);
        return;
      }

      // Update markers only, keeping the map fixed on Lebanon bounds.
      setMarkers([{ position: place.geometry.location }]);
    });

    // Reattach search input when switching to fullscreen
    map.getDiv().addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        map.controls[google.maps.ControlPosition.TOP_LEFT].clear();
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);
      }
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8} // Default zoom remains on Lebanon.
        center={center} // Default center remains on Lebanon.
        restriction={{
          latLngBounds: lebanonBounds,
          strictBounds: false,
        }}
        onLoad={handleMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
