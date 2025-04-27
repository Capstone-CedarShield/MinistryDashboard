import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
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

const Maps = ({ incidentLocation }) => {

  console.log('incidentLocation', incidentLocation);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBXGGBbpCxSdardQw9h_BlN6EwpGgARxTg',
    libraries,
  });

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBXGGBbpCxSdardQw9h_BlN6EwpGgARxTg`
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

  useEffect(() => {
    const updateMapWithLocation = async () => {
      if (incidentLocation && typeof incidentLocation === 'string') {
        const coordinates = await geocodeAddress(incidentLocation);
        if (coordinates && mapRef.current) {
          mapRef.current.panTo(coordinates);
          mapRef.current.setZoom(15);
          setMarkers([{ position: coordinates }]);
        }
      } else if (incidentLocation && typeof incidentLocation === 'object') {
        if (mapRef.current) {
          mapRef.current.panTo(incidentLocation);
          mapRef.current.setZoom(15);
          setMarkers([{ position: incidentLocation }]);
        }
      }
    };

    updateMapWithLocation();
  }, [incidentLocation]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  const handleMapLoad = (map) => {
    mapRef.current = map;

    // Create the search input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search for a place';
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

    // Add a listener for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log('No details available for input: ' + place.name);
        return;
      }

      // Center map on the selected place
      map.panTo(place.geometry.location);
      map.setZoom(15);

      // Add a marker at the location
      setMarkers([
        {
          position: place.geometry.location,
        },
      ]);
    });

    // Listen for fullscreen changes
    map.getDiv().addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        // Reattach the search input to the expanded map
        map.controls[google.maps.ControlPosition.TOP_LEFT].clear();
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
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

export default Maps;