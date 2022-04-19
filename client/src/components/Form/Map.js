import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
  // static defaultProps = {
  //     center: {
  //       lat: 59.95,
  //       lng: 30.33
  //     },
  //     zoom: 11
  //   };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "200px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDF_8HnCIhIz_HKtASTdt6lsiRDha_-1hc" }}
        defaultCenter={{ lat: 27.736403, lng: 85.304977 }}
        defaultZoom={12}
      >
        <AnyReactComponent lat={27.736403} lng={85.304977} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
