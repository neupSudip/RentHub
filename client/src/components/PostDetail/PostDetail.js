import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import Comment from "./Comment";

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
    <div>
      {!post ? (
        <h1>page not found</h1>
      ) : (
        <div>
          <img className="image" src={post.image} alt={post.title} />
          <h1> {post.title}</h1>
          <h1>{post.creatorName}</h1>
          <h1> {`NRP ${post.amount}`}</h1>
          <h1>{post.location}</h1>
          <h1>{post.tags.map((tag) => `#${tag} `)}</h1>
          <h1>{moment(post.createdAt).format("DD MMM, YYYY")}</h1>
        </div>
      )}

      {post && <Comment post={post} />}

      {/* Recommendation Section */}

      {/* {recommend?.length && (
        <div>
          <h1>Recommendation</h1>
          {(recommend.length = 4)}
          {recommend?.map(({ _id, image, title, location }) => (
            <div onClick={() => openPost(_id)} key={_id}>
              <img className="image" src={image} alt={title} />
              <h1>{title}</h1>
              <h1>{location}</h1>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default PostDetail;
