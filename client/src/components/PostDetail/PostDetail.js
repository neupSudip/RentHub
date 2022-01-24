import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import Comment from "./Comment";

import requiredImage from "../../images/required.jpg";

import "./postdetails.css";

const PostDetail = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const openPost = (id) => {
    history(`/posts/${id}`);
  };

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({
          location: post.location,
          title: post.title,
          tags: "none",
        })
      );
    }
  }, [post]);

  const recommend = posts?.filter(
    (p) =>
      p.creatorId !== user?._id &&
      p.creatorType !== user?.userType &&
      p._id !== post?._id
  );

  return (
    <div className="post-details">
      {!post ? (
        <h1>page not found</h1>
      ) : (
        <>
          <h1 className="creator-name">
            {`${post.creatorName} || ${moment(post.createdAt).format(
              "DD MMM, YYYY"
            )}`}{" "}
          </h1>

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
              Geo location <br /> this section is not created yet
            </div>
            <div className="booking-section">
              Booking Section <br /> this section is not created yet
            </div>
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

      {post && <Comment post={post} />}

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
