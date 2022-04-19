import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  getPostsBySearch,
  getSavedPosts,
  savePost,
} from "../../actions/posts";
import { createConversation } from "../../actions/message";
import Comment from "./Comment";

import requiredImage from "../../images/required.jpg";
import Map from "../GoogleMap/Map";

import "./postdetails.css";

const PostDetail = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const userType = user.userType;

  useEffect(() => {
    dispatch(getPost(id, setLoading));
  }, [id]);

  const openPost = (id) => {
    history(`/post/${id}`);
  };

  const members = [user?._id, post?.creatorId];

  const createConversations = async () => {
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
  };

  // const { savedPosts } = useSelector((state) => state.posts);

  // console.log(savedPosts.indexOf(id) > -1);

  return (
    <div className="post-details">
      {loading && <h1>Loading ....</h1>}

      {!loading && !post && <h1>Page not found</h1>}
      {post && (
        <>
          <h1 className="creator-name">
            {`${post.creatorName} || ${moment(post.createdAt).format(
              "DD MMM, YYYY"
            )}`}{" "}
          </h1>

          {post.creatorId !== user._id && (
            <h2 onClick={() => createConversations()}>message</h2>
          )}

          <div className="detail-img">
            {post.image ? (
              <img src={post.image} alt={post.title} />
            ) : (
              <img src={requiredImage} alt={post.title} />
            )}
          </div>
          <h1> {post.title}</h1>

          <h2> {`NRP ${post.amount} (${post.negotiable})`}</h2>
          <h2>{post.location}</h2>
          <div className="location-booking">
            <div className="geo-location">
              {/* <Map cords={post.cords} /> */}
            </div>
            {post.creatorId !== user._id && (
              <div className="booking-section">
                <button onClick={handleSavePost}>save post</button>
              </div>
            )}
          </div>
          <p className="discription">{post.discription}</p>
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

      {recommend?.length ? (
        <>
          <h1>Recommendation</h1>
          <div className="recommended-posts">
            {/* {(recommend.length = 4)} */}
            {recommend?.map((post) => (
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
        <h1>Sorry !! No related posts found....</h1>
      )}
    </div>
  );
};

export default PostDetail;
