import React from "react";
import GoogleMapReact from "google-map-react";
//api key = AIzaSyD6WGupW5A7sKYBckF3JmFOl5HFb0dhJyA

const Map = () => {
  const cords = { lat: 45, lng: 45 };
  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD6WGupW5A7sKYBckF3JmFOl5HFb0dhJyA" }}
        defaultCenter={cords}
        center={cords}
        defaultZoom={5}
        margin={[10, 10, 10, 10]}
        options={""}
        onChange={""}
        onChildClick={""}
        onClick={""}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
