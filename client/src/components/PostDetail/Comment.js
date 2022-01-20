import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";

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

    ref.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div>
      <div className="view-comments">
        <h1>Reviews</h1>
        {comments?.map((cmt, i) => (
          <div key={i}>
            <h3>{cmt.split(": ")[0]}</h3>
            <p> {cmt.split(":")[1]} </p>
          </div>
        ))}
        <div ref={ref}></div>
      </div>
      <div>
        <h3>Post a comment</h3>
        <textarea
          className="comment-area"
          type="textarea"
          name="comment"
          label="Comment"
          placeholder="Add a Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={!comment} onClick={handleClick}>
          Comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
