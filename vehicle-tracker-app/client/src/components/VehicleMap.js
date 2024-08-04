// src/components/VehicleMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import vehicleIcon from '../assets/car-image.png';

const VehicleMap = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([16.94913, 81.69065]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/vehicle');
        console.log(response);
        if (response.data.length > 0) {
          const validLocations = response.data.filter(loc =>
            typeof loc.latitude === 'number' && typeof loc.longitude === 'number'
          );
          setLocations(validLocations);
          setCurrentLocation([validLocations[validLocations.length - 1].latitude, validLocations[validLocations.length - 1].longitude]);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  const position = [currentLocation[0], currentLocation[1]];

  return (
    <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.length > 0 && (
        <>
          <Marker position={position} icon={L.icon({ iconUrl: vehicleIcon, iconSize: [42, 42] })} />
          <Polyline positions={locations.map(loc => [loc.latitude, loc.longitude])} />
        </>
      )}
    </MapContainer>
  );
};

export default VehicleMap;
