import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import KhaltiCheckout from "khalti-checkout-web";
import { removeSavedPost, bookPost } from "../../actions/posts";
import "./profile.css";
import khaltiKey from "../Khalti/Khalti.key";

const SavedPosts = ({ post, userId, setRemoveId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const config = {
    publicKey: khaltiKey.publicKey,
    productIdentity: `${userId},${post._id}`,
    productName: "Rent",
    productUrl: "http://localhost:3000/",
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
    eventHandler: {
      onSuccess(payload) {
        let data = {
          token: payload.token,
          amount: payload.amount,
        };

        axios
          .get(
            `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${khaltiKey.secretKey}`
          )
          .then((response) => {
            dispatch(bookPost(userId, post._id));
            setRemoveId(post._id);
            setMessage("Payment Successfull");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  let checkout = new KhaltiCheckout(config);

  const date = moment(post.createdAt).format("DD MMM, YYYY");

  const openPost = () => {
    history(`/post/${post._id}`);
  };

  const handleRemove = () => {
    setRemoveId(post._id);
    dispatch(removeSavedPost(userId, post._id));
  };

  const handleCheckout = () => {
    dispatch(bookPost(userId, post._id));
    setRemoveId(post._id);
    // checkout.show({ amount: 1000 });
  };

  return (
    <div className="grid-item">
      {message && (
        <div className="error-box">
          <h2 className="error-message">{message}</h2>
          <h1 onClick={() => setMessage("")}>&#10008;</h1>
        </div>
      )}
      <div onClick={openPost}>
        {post.people ? (
          <h1>{`${post.title}, ${post.people} people`}</h1>
        ) : (
          <h1> {post.title}</h1>
        )}
        <h3 className="price-tag">
          {" "}
          {`NRP ${post?.amount} (${post?.negotiable})`}
        </h3>
        <h3>{post?.location}</h3>

        <h3 className="blue-tag">{post?.tags.map((tag) => `#${tag} `)}</h3>
        <h3>{date}</h3>
      </div>

      <button className="btn-remove" onClick={handleRemove}>
        Remove
      </button>
      {post.creatorType === "owner" && !post.booked && (
        <button className="btn-book" onClick={handleCheckout}>
          Book
        </button>
      )}
    </div>
  );
};

export default SavedPosts;
