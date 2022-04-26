import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";
import { Helmet } from "react-helmet";

import imgs from "../../images/image.jpg";

const Welcome = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome | RentHub</title>
      </Helmet>
      Login to view content
    </div>
  );
};

export default Welcome;
