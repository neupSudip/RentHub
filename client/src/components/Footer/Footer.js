import React from "react";
import "./footer.css";

import fb from "../../images/fb.png";
import insta from "../../images/intagram.png";
import twitter from "../../images/twitter.png";
import youtube from "../../images/youtube.png";

const Footer = () => {
  return (
    <div className="footer">
      <p className="text">
        RentHub provides you easy and quick excess to ongoing vacant rooms and
        flat
      </p>
      <div className="footer-content">
        <div className="profile">
          <h3>Our Services</h3>
          <p className="footer-text">Post Requirement</p>
          <p className="footer-text">In-app chat system</p>
          <p className="footer-text">Easy booking</p>
        </div>
        <div className="contact">
          <h3>Contact Us</h3>
          <p className="footer-text">&#x1F4CD; NewBuspark, Kathmandu</p>
          <p className="footer-text">☎ +977 - 9861282073</p>
          <p className="footer-text">
            &#128231; np03s200010@heraldcollege.edu.np{" "}
          </p>
        </div>
        <div className="follow">
          <h3>Follow Us</h3>
          <div className="footer-img">
            <a
              href="https://www.instagram.com/neup_sudip/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="INSTA" />
            </a>
            <a
              href="https://www.facebook.com/SudipGKUN621"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="FB" />
            </a>
            <a
              href="https://twitter.com/neup_Sudip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="TWITTER" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCX4u_oLWRitQofaup9iYItA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="YOUTUBE" />
            </a>
          </div>
        </div>
      </div>
      <p className="text">
        © 2022 RentHub Rental Services || All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
