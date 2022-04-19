import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import "./postdetails.css";

const Comment = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const ref = useRef();

  const handleClick = async () => {
    const finalComment = `${user.name}: ${comment}`;
    const newComments = await dispatch(commentPost(post._id, finalComment));
    setComments(newComments);
    setComment("");

    ref.current.scrollIntoView({ block: "end", inline: "nearest" });
  };

  const handleKey = async (e) => {
    if (e.charCode === 13) {
      handleClick();
    }
  };

  return (
    <div>
      <h1 className="reviews">Reviews</h1>
      <div className="comment-section">
        <div className="view-comments">
          <div>
            {comments?.length > 0 ? (
              comments?.map((cmt, i) => (
                <div key={i}>
                  <p>
                    <span> {cmt.split(": ")[0]}: </span> {cmt.split(":")[1]}{" "}
                  </p>
                </div>
              ))
            ) : (
              <h3>Be the first to comment</h3>
            )}

            <div ref={ref}></div>
          </div>
        </div>
        <div className="add-comments">
          <h3>Post a comment</h3>
          <textarea
            className="comment-area"
            type="textarea"
            name="comment"
            label="Comment"
            placeholder="Add a Review"
            onKeyPress={handleKey}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button disabled={!comment} onClick={handleClick}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
