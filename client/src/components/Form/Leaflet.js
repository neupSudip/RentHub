import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "./leaflet.css";

const Leaflet = ({ setLocation }) => {
  const [lat, setLat] = useState("");
  const [lng, setlog] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setlog(position.coords.longitude);
      setLocation({ lat, lng });
    });
  }, []);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLat(lat);
        setlog(lng);
        setLocation({ lat, lng });
      },
    });
    return null;
  };

  return (
    <>
      {lat && lng && (
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={true}
          // onClick={handleClick}
        >
          <LocationFinderDummy />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Leaflet;
