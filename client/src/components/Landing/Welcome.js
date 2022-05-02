import React from "react";
import "./welcome.css";
import { Helmet } from "react-helmet";

import Footer from "../Footer/Footer";

import journey from "../../images/journey.png";
import features from "../../images/features.webp";
import aims from "../../images/aims.png";

const Welcome = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome | RentHub</title>
      </Helmet>

      <div class="our-journey">
        <div class="journey">
          <h3>Our Journey</h3>
          <p>
            On <strong>1999 September 4</strong>, RentHub - Rental services was
            established. RentHub is a web-based application with two different
            types of users where both types of users will be posting their needs
            with additional requirements. One type of user will only be viewing
            another type of user’s posts on their dashboard. Users can easily
            create, remove or hide and delete their posts. Post will include
            photos, information with geo location. Search facility with multiple
            filtering options, suggested posts on post pages. Integrating a
            payment gateway method for creating a post or to be a valid user for
            the system. A real time chat system within the application for
            easier and secure communication between the users. The system will
            also have different authentication measures and support social media
            logging function for quicker excess. It helps users to reset and
            login when they forget their credentials You can get more
            information and our travel journey on our official &nbsp;
            <a
              class="p-tag"
              href="https://www.instagram.com/neup_sudip/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Instagram,{" "}
            </a>
            <a
              class="p-tag"
              href="https://www.facebook.com/SudipGKUN621"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook,{" "}
            </a>
            &nbsp;
            <a
              class="p-tag"
              href="https://twitter.com/neup_Sudip"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp; Twitter{" "}
            </a>{" "}
            and
            <a
              class="p-tag"
              href="https://www.youtube.com/channel/UCX4u_oLWRitQofaup9iYItA"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp; Youtube&nbsp;
            </a>
            page. The CEO of our company is <strong>Sudip Neupane </strong>{" "}
            (former student at Herald College affiliated with UK University).
          </p>
        </div>
        <div class="journey-img">
          <img src={journey} alt="INSTA" />
        </div>
      </div>

      <div style={{ margin: "5rem 0px" }}></div>

      <div class="our-journey">
        <div class="journey-img">
          <img src={aims} alt="INSTA" />
        </div>
        <div class="journey">
          <h3>Our Aims and Mottos</h3>
          <p>
            <strong>Our Aims</strong>
          </p>

          <p>
            1. Satisfying users(owners/tenants) by finding what they need in
            faster and easier ways.
            <br />
            2. To bridge the needs of two different users.
          </p>
          <br />
          <p>
            <strong>Our Mottos</strong>
          </p>
          <p>
            1. Finds best and suitable rooms as well as roomers easily and
            quickly.
            <br />
            2. Builds a trust among tenants and owners through technology by
            being honest with the needs. <br />
            3. Provide information on what kinds of people person wants for
            sharing house.
            <br />
            4. Provide information on running trends of room system and rent
            amount in different places
          </p>
        </div>
      </div>

      <div style={{ margin: "5rem 0px" }}></div>

      <div class="our-journey">
        <div class="journey">
          <h3>Our Features</h3>
          <p>
            1: User registration and logging using google
            <br />
            2: Post creation with geo location and multiple images
            <br />
            3: In app real time chat system
            <br />
            4: Quick Searching and Recommendation of post
            <br />
            5: Book your favourite post using Khalti Wallet
            <br />
            6: Responsive and user-friendly user interface
          </p>
        </div>
        <div class="journey-img">
          <img src={features} alt="INSTA" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Welcome;
