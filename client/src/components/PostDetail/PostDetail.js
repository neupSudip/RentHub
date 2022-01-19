import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetail = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  console.log(post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

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

  const recommend = posts?.filter(({ _id }) => _id !== post?._id);

  console.log(recommend);

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
    </div>
  );
};

export default PostDetail;
