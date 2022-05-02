import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import "./form.css";
import Leaflet from "./Leaflet";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  const [title, setTitle] = useState("Create");

  const [postData, setPostDate] = useState({
    creatorId: "",
    creatorType: "",
    title: "1 BHK",
    location: "",
    coords: "",
    people: "",
    amount: "",
    tags: "",
    discription: "",
    negotiable: "negotiable",
    image: "",
    image2: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.userPosts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (post) setPostDate(post);
  }, [post]);

  useEffect(() => {
    if (!currentId) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        //setLocation({ latitude, longitude });
        setPostDate({ ...postData, coords: `${latitude},${longitude}` });
      });
      setTitle("Create");
    }
    if (currentId) {
      setTitle("Update");
    }
  }, [post, currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !postData.image &&
      !postData.image2 &&
      user.result.userType === "owner"
    ) {
      setError("Image is required");
    } else {
      if (currentId) {
        dispatch(
          updatePost(currentId, {
            ...postData,
            coords: `${location.lat},${location.lng}`,
            creatorName: user?.result?.name,
            creatorType: user?.result?.userType,
          })
        );
      } else {
        dispatch(
          createPost({
            ...postData,
            coords: `${location.lat},${location.lng}`,
            creatorName: user?.result?.name,
            creatorType: user?.result?.userType,
          })
        );
      }
      reset();
      history("/profile");
    }
  };

  const reset = () => {
    setCurrentId(null);
    setPostDate({
      creatorId: "",
      creatorType: "",
      title: "1 BHK",
      location: "",
      coords: "",
      people: "",
      amount: "",
      tags: "",
      discription: "",
      negotiable: "negotiable",
      image: "",
      image2: "",
    });
  };

  return (
    <div>
      <Helmet>
        <title>{title} | RentHub</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="post-form">
        {error && (
          <div className="error-box">
            <h2 className="error-message">{error}</h2>
            <h1 onClick={() => setError("")}>&#10008;</h1>
          </div>
        )}

        <h1>{currentId ? "Update" : "Create"} Post</h1>
        <p>Select a title</p>
        <select
          onChange={(e) => setPostDate({ ...postData, title: e.target.value })}
        >
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="1 Rooom">1 Room</option>
          <option value="2 Rooms">2 Rooms</option>
        </select>
        <p>Amount in Rupees</p>
        <input
          type="number"
          name="amount"
          label="amount"
          placeholder="amount"
          min={0}
          value={postData?.amount}
          onChange={(e) => setPostDate({ ...postData, amount: e.target.value })}
          required
        />
        <p>Location: (Naxal, Kathmandu)</p>
        <input
          type="text"
          name="location"
          label="location"
          placeholder="location"
          value={postData.location}
          onChange={(e) =>
            setPostDate({ ...postData, location: e.target.value })
          }
          required
        />

        <p>Tags/Facilities: water24hours,parking,internet</p>
        <input
          type="text"
          name="tags"
          label="tittagsle"
          placeholder="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostDate({
              ...postData,
              tags: e.target.value.split(",").map((item) => item.trim()),
            })
          }
          required
        />
        <p>Add a description to Post</p>
        <textarea
          type="text"
          name="discription"
          label="discription"
          placeholder="discription"
          value={postData.discription}
          onChange={(e) =>
            setPostDate({ ...postData, discription: e.target.value })
          }
          required
        />

        <select
          onChange={(e) =>
            setPostDate({ ...postData, negotiable: e.target.value })
          }
          required
        >
          <option value="negotiable">negotiable</option>
          <option value="non-negotiable">non-negotiable</option>
        </select>

        {user?.result.userType === "owner" ? (
          <>
            <p>Geo Location: </p>

            <div className="map">
              <Leaflet setLocation={setLocation} />
            </div>

            <p>Add images of Rooms</p>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostDate({ ...postData, image: base64 })
              }
            />
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostDate({ ...postData, image2: base64 })
              }
            />
          </>
        ) : (
          <>
            <p>Number of people</p>
            <input
              type="number"
              name="people"
              label="people"
              placeholder="people"
              value={postData.people}
              onChange={(e) =>
                setPostDate({ ...postData, people: e.target.value })
              }
              required
            />
          </>
        )}

        <button className="btn-reset" onClick={reset}>
          Reset
        </button>
        <button className="btn-submit" type="submit">
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default Form;
