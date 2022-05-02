import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";
import {
  getPost,
  getPostsBySearch,
  getSavedPosts,
  savePost,
} from "../../actions/posts";
import { createConversation } from "../../actions/message";
import Comment from "./Comment";
import Leaflet from "./Leaflet";

import requiredImage from "../../images/require.png";

import "./postdetails.css";

const PostDetail = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const userType = user.userType;

  useEffect(() => {
    dispatch(getPost(id, setLoading));
  }, [id]);

  const openPost = (id) => {
    history(`/post/${id}`);
  };

  const members = [user?._id, post?.creatorId];

  const createConversations = () => {
    dispatch(createConversation(members, history));
  };

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch(
          {
            location: post.location,
            title: post.title,
            tags: "none",
            userType,
          },
          setLoading
        )
      );
    }
  }, [post]);

  const recommend = posts?.filter(
    (p) => p.creatorId !== user?._id && p._id !== post?._id
  );

  const handleSavePost = () => {
    dispatch(savePost(user?._id, post?._id));
    setSaved(true);
  };

  return (
    <div className="post-details">
      {loading && (
        <CircularProgress
          style={{ position: "absolute", top: "50vh", left: "50%" }}
          size="8rem"
          sx={{ color: "green" }}
        />
      )}

      {!loading && !post && <h1>Page not found</h1>}
      {post && (
        <>
          <Helmet>
            <title>{post?.title} | RentHub</title>
          </Helmet>

          <div className="top-name-message">
            <h1 className="creator-name">
              {`${post.creatorName} || ${moment(post.createdAt).format(
                "DD MMM, YYYY"
              )}`}{" "}
            </h1>

            {post.creatorId !== user._id && (
              <button onClick={() => createConversations()}>message</button>
            )}
          </div>

          <div className="detail-img">
            {post.image ? (
              <>
                <img src={post.image} alt={post.title} />
                <img src={post.image2} alt={post.title} />
              </>
            ) : (
              <img src={requiredImage} alt={post.title} />
            )}
          </div>

          <div className="title-booking">
            <div className="title-section">
              <h1>
                {post.people
                  ? `** ${post.title} for ${post.people} people **`
                  : `${post.title}`}
              </h1>

              <h2> {`NRP ${post.amount} (${post.negotiable})`}</h2>
              <h2>{`Near ${post.location}`}</h2>
            </div>

            {post.creatorId !== user._id && !post.booked && !saved && (
              <div className="booking-section">
                <button onClick={handleSavePost}>save post</button>
              </div>
            )}

            {saved && (
              <div className="booking-section">
                <button>Post saved</button>
              </div>
            )}
            {post.booked && (
              <h3 className="booked-info">
                This post has been booked by user. If you want to know further
                details, please contact the owner of the post.
              </h3>
            )}
          </div>

          <p className="discription">{post.discription}</p>
          {post?.coords && post?.coords !== "undefined,undefined" && (
            <div className="geo-location">
              <Leaflet location={post.coords} />
            </div>
          )}
          <h2 className="facilities">Facilities: </h2>
          <div className="tags">
            {post.tags.map((tag, i) => (
              <p key={i}>{tag}</p>
            ))}
          </div>
        </>
      )}

      {post?._id === id && <Comment post={post} />}

      {/* Recommendation Section */}

      <h1 style={{ margin: "2rem auto" }}>Recommended posts</h1>
      {recommend?.length ? (
        <>
          <div className="recommended-posts">
            {/* {(recommend.length = 4)} */}
            {recommend?.slice(0, 4).map((post) => (
              <div
                className="recommended-post"
                key={post._id}
                onClick={() => openPost(post._id)}
              >
                {post.image ? (
                  <img
                    className="recommend-img"
                    src={post.image}
                    alt={post.title}
                  />
                ) : (
                  <img
                    className="recommend-img"
                    onClick={openPost}
                    src={requiredImage}
                    alt={post.title}
                  />
                )}

                <h3>{post.title}</h3>
                <h3>{post.location}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 style={{ textAlign: "center", margin: "2rem auto" }}>
          Sorry !! No related posts found....
        </h1>
      )}
    </div>
  );
};

export default PostDetail;
