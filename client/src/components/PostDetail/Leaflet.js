import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../Form/leaflet.css";

const Leaflet = ({ location }) => {
  const lat = location.split(",")[0];
  const lng = location.split(",")[1];

  return (
    <>
      {lat && lng && (
        <MapContainer center={[lat, lng]} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Leaflet;
